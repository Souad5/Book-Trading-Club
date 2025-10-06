import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ChatPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timer);
  }, []);

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
              className="bg-blue-600 text-white rounded-full px-4 py-3 shadow-lg hover:bg-blue-700"
            >
              💬 Chat with us
            </button>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl w-80 h-96 flex flex-col">
              <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-2xl">
                <h2 className="font-semibold text-sm">AI Assistant</h2>
                <button onClick={() => setIsOpen(false)}>✖</button>
              </div>
              <div className="flex-1 p-3 overflow-y-auto text-gray-700 text-sm">
                <p>👋 Hi! How can I help you today?</p>
                {/* You can render chat messages here */}
              </div>
              <div className="p-3 border-t">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full border rounded-lg p-2 text-sm"
                />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default ChatPopup;
