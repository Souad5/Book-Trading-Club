import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateResponse } from "@/utils/gemini";

interface Message {
  type: "user" | "ai";
  text: string;
}

const ChatPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show chat popup after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Show typing indicator
    setLoading(true);

    try {
      const aiText = await generateResponse(input);
      const aiMessage: Message = { type: "ai", text: aiText };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="bg-white rounded-2xl shadow-xl w-80 h-96 flex flex-col overflow-hidden">
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

              {/* Messages */}
              <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${
                      msg.type === "user"
                        ? "text-right"
                        : "text-left"
                    }`}
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

                {/* Loading indicator */}
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

              {/* Input */}
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
                  onClick={handleSend}
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
