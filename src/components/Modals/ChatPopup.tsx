import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateResponse } from "@/utils/gemini";

interface Message {
  type: "user" | "ai";
  text: string;
}

// ✅ Predefined questions and answers
const predefinedQA: Record<string, string> = {
  "How can I order?":
    "You can place an order by clicking the 'Order Now' button and following the checkout steps.",
  "How can I contact the admin?":
    "You can contact the admin via the Contact Us page or by emailing support@example.com.",
  "Do you provide refunds?":
    "Yes, we offer refunds within 7 days if the product doesn’t meet your expectations.",
  "How long does delivery take?":
    "Delivery usually takes 3–5 business days depending on your location.",
  "What payment methods are accepted?":
    "We accept debit/credit cards, mobile banking, and cash on delivery in select areas.",
};

const ChatPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show chat popup after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ✅ Main send function
  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = { type: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // 🧠 If it's a predefined question — instantly show stored answer (no API call)
    if (predefinedQA[textToSend]) {
      const aiMessage: Message = { type: "ai", text: predefinedQA[textToSend] };
      setMessages((prev) => [...prev, aiMessage]);
      return;
    }

    // 🧠 Otherwise, call Gemini API
    setLoading(true);
    try {
      const aiText = await generateResponse(textToSend);
      const aiMessage: Message = { type: "ai", text: aiText };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = Object.keys(predefinedQA);

  return (
    <>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {!isOpen ? (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-600 text-white rounded-full px-4 py-3 shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              💬 Chat with us
            </button>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl w-80 h-[450px] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-2xl">
                <h2 className="font-semibold text-sm">AI Assistant</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:text-gray-200 transition"
                >
                  ✖
                </button>
              </div>

              {/* Messages Section */}
              <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${msg.type === "user" ? "text-right" : "text-left"}`}
                  >
                    <span
                      className={`inline-block px-3 py-1 rounded-lg ${
                        msg.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </span>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {loading && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-left"
                    >
                      <span className="inline-block px-3 py-1 rounded-lg bg-gray-200 text-gray-800 italic animate-pulse">
                        AI is typing...
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Quick question buttons */}
              <div className="p-2 border-t bg-gray-50">
                <p className="text-xs text-gray-500 mb-1">Try asking:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-200 transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input box */}
              <div className="p-3 border-t flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg p-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={() => handleSend()}
                  className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700 transition"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default ChatPopup;
