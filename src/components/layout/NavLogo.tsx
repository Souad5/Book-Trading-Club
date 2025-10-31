import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react"; // optional icon

export default function NavLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 px-2 py-1 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <BookOpen className="w-7 h-7 text-gray-500 dark:text-white" />
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        <span className="text-gray-500 text-4xl dark:text-gray-400">S</span>helf
        <span className="text-gray-500 text-3xl dark:text-gray-400">S</span>hare
      </h1>
    </Link>
  );
}
