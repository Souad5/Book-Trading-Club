import type{ FC } from "react";
import { motion } from "framer-motion";

const About: FC = () => {
  return (
    <div className="min-h-screen text-gray-800 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center bg-gray-500 dark:bg-white rounded-2xl shadow-lg p-10 "
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-white dark:text-black"
        >
          About Book Trading Club
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg leading-relaxed mb-6 text-white dark:text-black"
        >
          <span className="font-semibold ">Book Trading Club</span> is a
          community-driven platform designed to make reading more accessible and
          sustainable. Instead of buying new books, our users can easily{" "}
          <span className="font-semibold">exchange books</span>{" "}
          with others nearby, discover hidden gems, and save money while helping
          the environment.
        </motion.p>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white dark:bg-gray-500  p-6 rounded-xl shadow-inner mb-6"
        >
          <h2 className="text-2xl font-semibold dark:text-white text-black mb-3">
            Our Mission
          </h2>
          <p className="dark:text-white text-black">
            To build a culture of sharing, where every book finds a new home and
            every reader finds their next favorite story.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white dark:bg-gray-500 p-6 rounded-xl shadow-inner"
        >
          <h2 className="text-2xl font-semibold dark:text-white text-black mb-3">
            Our Vision
          </h2>
          <p className="dark:text-white text-black">
            A global book-sharing network that promotes affordability,
            community-building, and environmental sustainability.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
