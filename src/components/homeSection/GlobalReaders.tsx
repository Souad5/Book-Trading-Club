// src/components/HomeSections/GlobalReaders.tsx
import { motion } from "framer-motion";

export default function GlobalReaders() {
  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Readers Around the World 🌎
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-10">
        Thousands of readers from different countries exchange stories and ideas
        every day.
      </p>
      <motion.div
        className="relative flex justify-center flex-wrap gap-4 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.img
            key={i}
            src={`https://i.pravatar.cc/100?img=${i + 1}`}
            alt="reader"
            className="w-16 h-16 rounded-full border-2 border-white shadow-md hover:scale-110 transition"
            whileHover={{ rotate: 5 }}
          />
        ))}
      </motion.div>
      <p className="mt-8 text-gray-700 italic">
        “Join 10,000+ members exchanging books and ideas globally.”
      </p>
    </section>
  );
}
