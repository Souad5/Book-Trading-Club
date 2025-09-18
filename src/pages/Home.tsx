import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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
};

const DEMO_BOOKS: Book[] = [
  {
    id: "1",
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "9780061122415",
    tags: ["inspirational", "journey"],
    location: "Dhaka",
    condition: "good",
    exchangeType: "swap",
    language: "English",
    genre: "Fiction",
  },
  {
    id: "2",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    isbn: "9780099590088",
    tags: ["history", "anthropology"],
    location: "Chattogram",
    condition: "new",
    exchangeType: "sell",
    language: "English",
    genre: "Non-fiction",
  },
  {
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    tags: ["self-help", "productivity"],
    location: "Rajshahi",
    condition: "good",
    exchangeType: "donate",
    language: "English",
    genre: "Self-help",
  },
  {
    id: "4",
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    isbn: "9780375704024",
    tags: ["classic", "japanese"],
    location: "Dhaka",
    condition: "fair",
    exchangeType: "swap",
    language: "English",
    genre: "Literary",
  },
  {
    id: "5",
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    isbn: "9780060883287",
    tags: ["magic realism"],
    location: "Sylhet",
    condition: "good",
    exchangeType: "swap",
    language: "English",
    genre: "Fiction",
  },
  {
    id: "6",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    tags: ["programming", "best practices"],
    location: "Khulna",
    condition: "new",
    exchangeType: "sell",
    language: "English",
    genre: "Technology",
  },
  {
    id: "7",
    title: "বেলা অবেলা কালবেলা",
    author: "সুনীল গঙ্গোপাধ্যায়",
    isbn: "9789848812345",
    tags: ["bangla", "classic"],
    location: "Dhaka",
    condition: "fair",
    exchangeType: "donate",
    language: "Bangla",
    genre: "Fiction",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");
  const [exchangeType, setExchangeType] = useState("");
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DEMO_BOOKS.filter((b) => {
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
  }, [query, location, condition, exchangeType, language, genre]);

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
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-sand-200 bg-gradient-to-br from-leaf-50 via-white to-sand-50 p-10">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-soil-900">
            Welcome to ShelfShare
          </h1>
          <p className="mt-3 max-w-2xl text-sand-700">
            Community, Exchange, and Sustainability. Discover, trade, and share
            books with readers around you.
          </p>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        ></div>
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-leaf-300/20 blur-3xl"
        ></div>
      </div>

      {/* Search Demo */}
      <div className="rounded-2xl bg-white p-6 md:p-8 border border-sand-200 shadow-subtle">
        <h2 className="text-xl font-semibold text-soil-900 mb-5">
          Search Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="w-full rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-sm placeholder-sand-500 focus:outline-none focus:ring-2 focus:ring-leaf-300"
            placeholder="Search title, author, ISBN, or tag"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className="rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-sm"
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
            className="rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-sm"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="">Any condition</option>
            <option value="new">New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>

          <select
            className="rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-sm"
            value={exchangeType}
            onChange={(e) => setExchangeType(e.target.value)}
          >
            <option value="">All exchange types</option>
            <option value="swap">Swap</option>
            <option value="donate">Donate</option>
            <option value="sell">Sell</option>
          </select>

          <select
            className="rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-sm"
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
            className="rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-sm"
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
        </div>

        {/* Results */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((b) => (
            <article
              key={b.id}
              className="group rounded-xl border border-sand-200 bg-white p-5 shadow-subtle hover:shadow-md transition-shadow"
            >
              <Link to={`/book/${b.id}`} className="block">
                <h3 className="font-semibold text-soil-900 tracking-tight">
                  {b.title}
                </h3>
                <p className="text-sm text-sand-700">
                  {b.author} · {b.language}
                </p>
                <p className="mt-1 text-xs text-sand-700">ISBN: {b.isbn}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded bg-sand-100 px-2 py-1">
                    {b.location}
                  </span>
                  <span className="rounded bg-sand-100 px-2 py-1">
                    {b.condition}
                  </span>
                  <span className="rounded bg-sand-100 px-2 py-1">
                    {b.exchangeType}
                  </span>
                  <span className="rounded bg-sand-100 px-2 py-1">
                    {b.genre}
                  </span>
                </div>
              </Link>
            </article>
          ))}
          {results.length === 0 && (
            <div className="col-span-full text-center text-sand-700">
              No matches. Try different keywords or filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
