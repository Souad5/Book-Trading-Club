// src/components/HeroSection.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/public/video/videoplayback.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Overlay (dark gradient for readability) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
          Trade. Discover. Share. <br />
          <span className="text-purple-400">Smarter with AI.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
          Join <span className="font-semibold">ShelfShare</span> – the AI-powered
          book trading club where your books find new shelves, and your next read
          finds you.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
            Start Sharing
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            <Link to="/browse">Browse Books</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
