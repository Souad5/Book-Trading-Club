// src/components/HomeSections/InspirationalQuotes.tsx
import { motion } from "framer-motion";

const quotes = [
  { text: "A reader lives a thousand lives before he dies. – George R.R. Martin" },
  { text: "Books are uniquely portable magic. – Stephen King" },
  { text: "So many books, so little time. – Frank Zappa" },
];

export default function InspirationalQuotes() {
  return (
    <section className="py-20 bg-[#f5f2ea] text-center relative overflow-hidden">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">
        Words That Inspire Us ✨
      </h2>
      <div className="max-w-2xl mx-auto">
        {quotes.map((quote, i) => (
          <motion.div
            key={i}
            className="mb-6 text-lg text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.5 }}
          >
            <p>“{quote.text}”</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
