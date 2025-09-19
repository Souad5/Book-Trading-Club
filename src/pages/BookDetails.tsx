import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import ShareModal from "../components/Modals/ShareModal"; 
import { useState } from "react";

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
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  // wishlist button clicked
  const handleWishlistClick = () => {
    toast.success("Added to wishlist!");
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating!");
      return;
    }
    toast.success("Review submitted!");
    setRating(0);
    setReview("");
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
                className="text-sm rounded bg-[#faf8f4] px-3 py-1 text-sand-700 border border-sand-300"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mt-6">
            <button className="px-5 py-2.5 bg-leaf-500 hover:bg-leaf-600 text-white rounded-lg shadow transition">
              Trade Now
            </button>

            <button
              onClick={handleWishlistClick}
              className="px-5 py-2.5 hover:bg-leaf-600 hover:text-white text-gray-500 font-semibold bg-[#faf8f4] border border-gray-300 rounded-lg shadow transition"
            >
              Add to wishlist
            </button>

            {/* Share Modal */}
            <ShareModal book={book} />
          </div>
          {/* Rate & Review Section */}
          <div className="mt-8 p-4 border border-sand-200 rounded-lg bg-sand-50">
            <h2 className="text-xl font-semibold mb-2">Rate & Review</h2>
            
            <div className="flex items-center mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-2 border border-sand-300 rounded-md text-sm"
            />

            <button
              onClick={handleSubmitReview}
              className="mt-3 px-4 py-2 bg-leaf-500 text-white rounded-lg hover:bg-leaf-600 transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
