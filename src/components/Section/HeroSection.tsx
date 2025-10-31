import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden overla">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/videoplayback.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay (dark mode aware) */}
      {/* Overlay (gray) */}
      <div className="absolute inset-0 bg-gray-700/20 dark:bg-gray-900/60 backdrop-blur-[2px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white dark:text-bg-light leading-tight drop-shadow-lg">
          Trade. Discover. Share. <br />
          <span className="text-ai-default drop-shadow-lg">
            Smarter with AI.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-100 dark:text-gray-300 max-w-2xl mx-auto">
          Join <span className="font-semibold text-gold">ShelfShare</span> – the
          AI-powered book trading club where your books find new shelves, and
          your next read finds you.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* CTA Button with AI Glow */}
          <Button
            size="lg"
            className="dark:bg-white bg-gray-600 dark:text-black border-white border-1  text-white  transition-all duration-300"
          >
            <Link to={"/become-seller"}>Start Sharing</Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className=" dark:bg-white bg-gray-600 dark:text-black border-white border-1  text-white  
  "
          >
            <Link to="/browse">Browse Books</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
