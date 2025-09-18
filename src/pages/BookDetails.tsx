import { useParams, Link } from "react-router-dom";

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

export default function BookDetails() {
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
      title: "বেলা অবেলা কালবেলা",
      author: "সুনীল গঙ্গোপাধ্যায়",
      isbn: "9789848812345",
      tags: ["bangla", "classic"],
      location: "Dhaka",
      condition: "fair",
      exchangeType: "donate",
      language: "Bangla",
      genre: "Fiction",
      image: "https://i.postimg.cc/W4s77hdw/image.png",
    },
  ];

  const { id } = useParams<{ id: string }>();
  const book = DEMO_BOOKS.find((b) => b.id === id);

  if (!book) {
    return <div className="p-6">❌ Book not found.</div>;
  }

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <Link to="/" className="text-blue-600 text-sm">
        &larr; Back to Home
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Book Image */}
        <div className="w-full">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Book Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-soil-900">{book.title}</h1>
          <p className="text-lg text-sand-700">by {book.author}</p>
          <p className="text-sm text-sand-500">ISBN: {book.isbn}</p>

          <div className="grid grid-cols-2 gap-3 text-sm mt-4">
            <p>
              <strong>Location:</strong> {book.location}
            </p>
            <p>
              <strong>Condition:</strong> {book.condition}
            </p>
            <p>
              <strong>Exchange:</strong> {book.exchangeType}
            </p>
            <p>
              <strong>Language:</strong> {book.language}
            </p>
            <p className="col-span-2">
              <strong>Genre:</strong> {book.genre}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {book.tags.map((t) => (
              <span
                key={t}
                className="text-sm rounded bg-sand-100 px-3 py-1 text-sand-700 border border-sand-300"
              >
                #{t}
              </span>
            ))}
          </div>

          <button className="mt-6 px-5 py-2.5 bg-leaf-500 hover:bg-leaf-600 text-white rounded-lg shadow transition">
            Request / Trade
          </button>
        </div>
      </div>
    </section>
  );
}
