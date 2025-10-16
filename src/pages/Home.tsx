<<<<<<< Updated upstream
import HeroSection from "@/components/Section/HeroSection";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< Updated upstream
import { DEMO_BOOKS as BROWSE_BOOKS } from "./Browse";
import { Search } from "lucide-react";
=======
import { Search, Heart } from "lucide-react";
>>>>>>> Stashed changes
import WantToBeSellerSection from "@/components/Section/WantToBeSeller";
import TopSellersSection from "@/components/Section/TopSeller";
import { toast } from "react-toastify";
import { useFavorites } from "@/hooks/useFavorites";
=======
// src/pages/Home.tsx
import HeroSection from '@/components/Section/HeroSection';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';
import WantToBeSellerSection from '@/components/Section/WantToBeSeller';
import TopSellersSection from '@/components/Section/TopSeller';
import notify from '@/lib/notify';
import { useFavorites } from '@/hooks/useFavorites';
import UseAxiosSecure from '@/axios/UseAxiosSecure';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
>>>>>>> Stashed changes

type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  tags: string[];
  location: string;
  condition: "new" | "good" | "fair";
  exchangeType: "swap" | "donate" | "sell";
  language: string;
  genre: string;
  image: string;
};

const DEMO_BOOKS: Book[] = BROWSE_BOOKS as unknown as Book[];

export default function Home() {
<<<<<<< Updated upstream
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");
  const [exchangeType, setExchangeType] = useState("");
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  
  // Use the new favorites hook
=======
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('');
  const [exchangeType, setExchangeType] = useState('');
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [sorting, setSorting] = useState<'asc' | 'desc' | ''>('');

>>>>>>> Stashed changes
  const { toggleFavorite, isFavorite, isAuthenticated } = useFavorites();

  const handleToggleFavorite = async (bookId: string) => {
    const book = DEMO_BOOKS.find(b => b.id === bookId);
    const bookTitle = book?.title || "Unknown Book";
    
    if (!isAuthenticated) {
<<<<<<< Updated upstream
      toast.error("Please log in to add books to favorites");
=======
      notify.error('Please log in to add books to favorites');
>>>>>>> Stashed changes
      return;
    }
    
    const wasFavorite = isFavorite(bookId);
    const success = await toggleFavorite(bookId);
    
    if (success) {
      if (wasFavorite) {
<<<<<<< Updated upstream
        toast.success(`"${bookTitle}" removed from favourites`, {
          toastId: `remove-${bookId}`
        });
      } else {
        toast.success(`"${bookTitle}" added to favourites`, {
          toastId: `add-${bookId}`
        });
      }
    } else {
      toast.error("Failed to update favorites");
=======
        notify.success(`"${bookTitle}" removed from favourites`, { toastId: `remove-${bookId}` });
      } else {
        notify.success(`"${bookTitle}" added to favourites`, { toastId: `add-${bookId}` });
      }
    } else {
      notify.error('Failed to update favorites');
>>>>>>> Stashed changes
    }
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
<<<<<<< Updated upstream
    return DEMO_BOOKS.filter((b) => {
=======
    const filtered = books.filter((b) => {
>>>>>>> Stashed changes
      const haystack = `${b.title} ${b.author} ${b.isbn} ${b.tags.join(
        " "
      )}`.toLowerCase();
      const matchesText = q.length === 0 || haystack.includes(q);
      const matchesLocation = !location || b.location === location;
      const matchesCondition =
        !condition || b.condition === (condition as Book["condition"]);
      const matchesExchange =
        !exchangeType ||
        b.exchangeType === (exchangeType as Book["exchangeType"]);
      const matchesLanguage = !language || b.language === language;
      const matchesGenre = !genre || b.genre === genre;
      return (
        matchesText &&
        matchesLocation &&
        matchesCondition &&
        matchesExchange &&
        matchesLanguage &&
        matchesGenre
      );
    });
<<<<<<< Updated upstream
  }, [query, location, condition, exchangeType, language, genre]);
=======

    if (!sorting) return filtered;

    const sorted = [...filtered].sort((a, b) => {
      const at = a.title.toLowerCase();
      const bt = b.title.toLowerCase();
      if (at < bt) return sorting === 'asc' ? -1 : 1;
      if (at > bt) return sorting === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [books, query, location, condition, exchangeType, language, genre, sorting]);
>>>>>>> Stashed changes

  const locations = useMemo(
    () => Array.from(new Set(DEMO_BOOKS.map((b) => b.location))),
    []
  );
  const languages = useMemo(
    () => Array.from(new Set(DEMO_BOOKS.map((b) => b.language))),
    []
  );
  const genres = useMemo(
    () => Array.from(new Set(DEMO_BOOKS.map((b) => b.genre))),
    []
  );

  return (
    <section>
      {/* Hero */}
      <HeroSection />

      {/* Fresh on the Shelf */}
      <div className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E1B4B]">
              Fresh on the Shelf
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the latest books shared by our community. Swap, donate,
              or buy — your next read is just a click away.
            </p>
          </div>

          {/* Search Filters */}
          <div className="rounded-2xl bg-white p-6 md:p-8 shadow-xl border border-gray-100">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 mb-5">
              <Search className="w-5 h-5 text-purple-600" />
              Search Books
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
              <input
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Search title, author, ISBN, or tag"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <select
                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">All locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              <select
                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="">Any condition</option>
                <option value="new">New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>

              <select
                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
                value={exchangeType}
                onChange={(e) => setExchangeType(e.target.value)}
              >
                <option value="">All exchange types</option>
                <option value="swap">Swap</option>
                <option value="donate">Donate</option>
                <option value="sell">Sell</option>
              </select>

              <select
                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">All languages</option>
                {languages.map((lng) => (
                  <option key={lng} value={lng}>
                    {lng}
                  </option>
                ))}
              </select>

              <select
                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="">All genres</option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>

              {/* Sorting */}
              <select
                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
                value={sorting}
                onChange={(e) => setSorting(e.target.value as 'asc' | 'desc' | '')}
              >
                <option value="">Sorting</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {/* Book Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.slice(0, 6).map((b) => (
              <article
                key={b.id}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow relative"
              >
                {/* Favorite Heart Icon */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleToggleFavorite(b.id);
                  }}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white hover:shadow-md transition-all duration-200"
                  aria-label={isFavorite(b.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isFavorite(b.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400 hover:text-red-400"
                    }`}
                  />
                </button>

                <Link to={`/book/${b.id}`} className="block space-y-2">
                  <div className="h-40 w-full overflow-hidden rounded-md bg-gray-100">
                    <img src={b.image} alt={b.title} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-purple-600">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {b.author} · {b.language}
                  </p>
                  <p className="text-xs text-gray-500">ISBN: {b.isbn}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded bg-purple-100 text-purple-700 px-2 py-1">
                      {b.location}
                    </span>
                    <span className="rounded bg-blue-100 text-blue-700 px-2 py-1">
                      {b.condition}
                    </span>
                    <span className="rounded bg-green-100 text-green-700 px-2 py-1">
                      {b.exchangeType}
                    </span>
                    <span className="rounded bg-pink-100 text-pink-700 px-2 py-1">
                      {b.genre}
                    </span>
                  </div>
                  <span className="mt-4 inline-block text-sm text-blue-600 hover:underline">View Details →</span>
                </Link>
              </article>
            ))}
            {results.length === 0 && (
              <div className="col-span-full text-center text-gray-600">
                No matches. Try different keywords or filters.
              </div>
            )}
          </div>

          {/* want to be seller section */}
          <WantToBeSellerSection></WantToBeSellerSection>
          {/* top seller section */}
          <TopSellersSection></TopSellersSection>
          {/* View All Button */}
          <div className="text-center">
            <Link
              to="/browse"
              className="inline-block bg-[#1E1B4B] text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition"
            >
              View All Books
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}