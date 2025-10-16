<<<<<<< Updated upstream
import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
=======
// src/pages/Browse.tsx
import { useSearchParams } from 'react-router-dom';
import UseAxiosSecure from '@/axios/UseAxiosSecure.js';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import BookCard from '@/Component/BookCard';
import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
>>>>>>> Stashed changes

type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  tags: string[];
  location: string;
  condition: string;
  exchangeType: string;
  language: string;
  genre: string;
  image: string;
};

export const DEMO_BOOKS: Book[] = [
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
    image: "https://i.postimg.cc/HLqfxWJD/the-alchemist.jpg",
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
    image: "https://i.postimg.cc/TPgttVPF/image.png",
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
    image: "https://i.postimg.cc/Hx34NB1Z/image.png",
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
    image: "https://i.postimg.cc/cH5tYjSS/image.png",
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
    image: "https://i.postimg.cc/Hn8nM9Hv/image.png",
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
    image: "https://i.postimg.cc/Z5QT8y71/image.png",
  },
  {
    id: "7",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    isbn: "9780201616224",
    tags: ["programming", "career"],
    location: "Chattogram",
    condition: "good",
    exchangeType: "sell",
    language: "English",
    genre: "Technology",
    image: "https://i.postimg.cc/RVmPVSmf/image.png",
  },
  {
    id: "8",
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    isbn: "9780201633610",
    tags: ["programming", "architecture"],
    location: "Sylhet",
    condition: "fair",
    exchangeType: "swap",
    language: "English",
    genre: "Technology",
    image: "https://i.postimg.cc/VkdXzpJn/image.png",
  },
  {
    id: "9",
    title: "কৃতদাসের হাসি",
    author: "সেলিনা হোসেন",
    isbn: "9789847024565",
    tags: ["bangla", "novel"],
    location: "Rajshahi",
    condition: "good",
    exchangeType: "donate",
    language: "Bangla",
    genre: "Fiction",
    image: "https://i.postimg.cc/CL6fr7c1/image.png",
  },
  {
    id: "10",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    isbn: "9780062457714",
    tags: ["self-help", "modern"],
    location: "Dhaka",
    condition: "new",
    exchangeType: "sell",
    language: "English",
    genre: "Self-help",
    image: "https://i.postimg.cc/XJVJYBsm/image.png",
  },
  {
    id: "11",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    isbn: "9781612680194",
    tags: ["finance", "wealth"],
    location: "Khulna",
    condition: "good",
    exchangeType: "swap",
    language: "English",
    genre: "Business",
    image: "https://i.postimg.cc/0NCkF29f/image.png",
  },
  {
    id: "12",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "9780374533557",
    tags: ["psychology", "behavior"],
    location: "Sylhet",
    condition: "fair",
    exchangeType: "donate",
    language: "English",
    genre: "Psychology",
    image: "https://i.postimg.cc/qBNthyJH/image.png",
  },
  {
    id: "13",
    title: "Digital Fortress",
    author: "Dan Brown",
    isbn: "9780312944926",
    tags: ["thriller", "technology"],
    location: "Rajshahi",
    condition: "good",
    exchangeType: "swap",
    language: "English",
    genre: "Thriller",
    image: "https://i.postimg.cc/2jnDKSTB/image.png",
  },
  {
    id: "14",
    title: "ছুটির ঘণ্টা",
    author: "সেলিনা হোসেন",
    isbn: "9789847027894",
    tags: ["bangla", "children"],
    location: "Chattogram",
    condition: "good",
    exchangeType: "donate",
    language: "Bangla",
    genre: "Children",
    image: "https://i.postimg.cc/NfQWC75W/image.png",
  },
  {
    id: "15",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    tags: ["classic", "jazz age"],
    location: "Dhaka",
    condition: "fair",
    exchangeType: "swap",
    language: "English",
    genre: "Literary",
    image: "https://i.postimg.cc/BnVkvrM0/image.png",
  },
];

export default function Browse() {
  const [searchParams] = useSearchParams();
<<<<<<< Updated upstream
  const rawQuery = searchParams.get("query") || "";
=======
  const initialQuery = (searchParams.get('query') || '').trim();
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('');
  const [exchangeType, setExchangeType] = useState('');
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [sorting, setSorting] = useState<'asc' | 'desc' | ''>('');

  const axiosSecure = UseAxiosSecure();

  const {
    data: books = [], // ✅ default to empty array
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const res = await axiosSecure.get<ApiBook[]>('/api/books');
      return res.data;
    },
    select: (apiBooks: ApiBook[]) => apiBooks.map(normalize),
    placeholderData: keepPreviousData, // ✅ v5 replacement for keepPreviousData option
    staleTime: 30_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Unique filter options
  const locations = useMemo(
    () => Array.from(new Set(books.map((b) => b.location))).filter(Boolean),
    [books]
  );
  const languages = useMemo(
    () => Array.from(new Set(books.map((b) => b.language))).filter(Boolean),
    [books]
  );
  const genres = useMemo(
    () => Array.from(new Set(books.map((b) => b.genre))).filter(Boolean),
    [books]
  );

  // Keep query state in sync with ?query= URL param when user searches from navbar
  useEffect(() => {
    const nextQuery = (searchParams.get('query') || '').trim();
    setQuery(nextQuery);
  }, [searchParams]);

  // Filter and sort results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = books.filter((b) => {
      const haystack = `${b.title} ${b.author} ${b.isbn} ${b.tags.join(' ')}`.toLowerCase();
      const matchesText = q.length === 0 || haystack.includes(q);
      const matchesLocation = !location || b.location === location;
      const matchesCondition = !condition || b.condition === condition;
      const matchesExchange = !exchangeType || b.exchangeType === exchangeType;
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

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-sand-200 bg-gradient-to-br from-sand-50 via-white to-leaf-50 p-8 mb-6">
          <h1 className="text-3xl font-semibold text-soil-900 tracking-tight">
            Browse Books
          </h1>
          <p className="mt-2 text-sand-700">Loading books…</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-xl font-semibold text-red-700">
            Failed to load books
          </h2>
          <p className="mt-2 text-red-600 text-sm">
            {(error as any)?.message ?? 'Please try again later.'}
          </p>
        </div>
      </section>
    );
  }
>>>>>>> Stashed changes

  const filtered = useMemo(() => {
    const q = rawQuery.trim().toLowerCase();
    if (q.length === 0) return DEMO_BOOKS;
    return DEMO_BOOKS.filter((b) => {
      const haystack = `${b.title} ${b.author} ${b.isbn} ${b.tags.join(
        " "
      )}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [rawQuery]);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-2xl border border-sand-200 bg-gradient-to-br from-sand-50 via-white to-leaf-50 p-8 mb-6">
        <h1 className="text-3xl font-semibold text-soil-900 tracking-tight">
          Browse Books
        </h1>
        <p className="mt-2 text-sand-700">
          Discover books available for exchange.
        </p>
      </div>

<<<<<<< Updated upstream
      {rawQuery && (
        <p className="mb-4 text-sm text-sand-700">
          Showing results for: <span className="font-medium">{rawQuery}</span>
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 && (
          <div className="col-span-full text-sand-700">
            No books matched your search.
          </div>
=======
      {/* Filters */}
      <div className="rounded-2xl bg-white p-6 md:p-8 shadow-xl border border-gray-100 mb-8">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {results.length === 0 ? (
          <div className="col-span-full text-sand-700">No books found.</div>
        ) : (
          results.map((book) => <BookCard key={book.id} book={book} />)
>>>>>>> Stashed changes
        )}
        {filtered.map((book) => (
          <Link to={`/book/${book.id}`} key={book.id}>
            <article className="rounded-xl border border-sand-200 bg-white p-5 shadow-subtle hover:shadow-md transition-shadow">
              {/* Book image */}
              <div className="h-40 w-full overflow-hidden rounded-md bg-sand-100/60">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Title + Author */}
              <h3 className="mt-3 font-semibold text-soil-900">
                {book.title}
              </h3>
              <p className="text-sm text-sand-700">
                {book.author} · {book.language}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-sand-100 px-2 py-1">
                  {book.location}
                </span>
                <span className="rounded bg-sand-100 px-2 py-1">
                  {book.condition}
                </span>
                <span className="rounded bg-sand-100 px-2 py-1">
                  {book.exchangeType}
                </span>
              </div>

              {/* Details link */}
              <Link
                to={`/book/${book.id}`}
                className="mt-4 inline-block text-sm text-blue-600 hover:underline"
              >
                View Details →
              </Link>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}