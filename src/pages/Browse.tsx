import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
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
  const rawQuery = searchParams.get("query") || "";

  const filtered = useMemo(() => {
    const q = rawQuery.trim().toLowerCase();
    if (q.length === 0) return DEMO_BOOKS;
    return DEMO_BOOKS.filter((b) => {
      const haystack = `${b.title} ${b.author} ${b.isbn} ${b.tags.join(" ")}`.toLowerCase();
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

      {rawQuery && (
        <p className="mb-4 text-sm text-sand-700">
          Showing results for: <span className="font-medium">{rawQuery}</span>
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 && (
          <div className="col-span-full text-sand-700">No books matched your search.</div>
        )}
        {filtered.map((book) => (

           <Link to={`/book/${book.id}`} key={book.id}>
           <article
            className="rounded-xl border border-sand-200 bg-white p-5 shadow-subtle hover:shadow-md transition-shadow"
          >
            {/* Book image */}
            <div className="h-40 w-full overflow-hidden rounded-md bg-sand-100/60">
              <img
                src={book.image}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Title + Author */}
            <h3 className="mt-3 font-semibold text-soil-900">{book.title}</h3>
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

           </article></Link>
        ))}
      </div>
    </section>
  );
}
