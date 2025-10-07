// src/pages/BookDetails.tsx
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShareModal from '../components/Modals/ShareModal';
import { useState } from 'react';
import UseAxiosSecure from '@/axios/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/SharedComponents/Loader';

// --- API shape for a single book (as returned by your backend) ---
type ApiBook = {
  _id?: string;
  id?: string;
  title: string;
  author: string;
  isbn?: string;
  location?: string;
  condition?: string;
  exchangeType?: string;
  language?: string;
  genre?: string;
  imageUrl: string;
  tags?: string[];
};

export default function BookDetails() {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const handleWishlistClick = () => {
    toast.success('Added to wishlist!');
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error('Please select a rating!');
      return;
    }
    toast.success('Review submitted!');
    setRating(0);
    setReview('');
  };

  const { id } = useParams<{ id: string }>();
  const axiosSecure = UseAxiosSecure();

  const {
    data: book,
    isLoading,
    isFetching,
  } = useQuery<ApiBook>({
    queryKey: ['book', id],
    queryFn: async () => {
      const res = await axiosSecure.get<ApiBook>(`/api/books/${id}`);
      return res.data;
    },
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });

  // ---- Compute values WITHOUT hooks (to keep hook order stable) ----
  const currentBookId = book?.id ?? book?._id;
  const showLoading =
    isLoading || (isFetching && book && String(currentBookId) !== String(id));

  // Guard: loading
  if (showLoading) return <Loader />;

  // Guard: not found
  if (!book) return <div className="p-6">❌ Book not found.</div>;

  // Shape for ShareModal
  const shareBook =
    currentBookId != null
      ? {
          id: String(currentBookId),
          title: book.title,
          author: book.author,
        }
      : null;

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <Link to="/" className="text-blue-600 text-sm">
        &larr; Back to Home
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Book Image */}
        <div className="w-full">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Book Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-soil-900">{book.title}</h1>
          <p className="text-lg text-sand-700">by {book.author}</p>
          {book.isbn && (
            <p className="text-sm text-sand-500">ISBN: {book.isbn}</p>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm mt-4">
            {book.location && (
              <p>
                <strong>Location:</strong> {book.location}
              </p>
            )}
            {book.condition && (
              <p>
                <strong>Condition:</strong> {book.condition}
              </p>
            )}
            {book.exchangeType && (
              <p>
                <strong>Exchange:</strong> {book.exchangeType}
              </p>
            )}
            {book.language && (
              <p>
                <strong>Language:</strong> {book.language}
              </p>
            )}
            {book.genre && (
              <p className="col-span-2">
                <strong>Genre:</strong> {book.genre}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(book.tags ?? []).map((t: string) => (
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

            {/* Share Modal (only if we have a concrete id) */}
            {shareBook && <ShareModal book={shareBook} />}
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
                    rating >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review... "
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
