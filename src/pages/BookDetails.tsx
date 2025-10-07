import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShareModal from '../components/Modals/ShareModal';
import { useMemo, useState } from 'react';
import UseAxiosSecure from '@/axios/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/SharedComponents/Loader';

// type Book = {
//   id: string;
//   title: string;
//   author: string;
//   isbn: string;
//   tags: string[];
//   location: string;
//   condition: 'new' | 'good' | 'fair';
//   exchangeType: 'swap' | 'donate' | 'sell';
//   language: string;
//   genre: string;
//   image: string;
// };

export default function BookDetails() {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  // wishlist button clicked
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
  console.log(id);
  const axiosSecure = UseAxiosSecure();
  const {
    data: book = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['book', id], // new key: all users
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/books/${id}`); // no email filter
      return res.data;
    },
    enabled: !!id, // wait until id exists
    staleTime: 0, // always considered stale
    refetchOnMount: 'always', // refresh when you arrive
    refetchOnWindowFocus: false,
  });
  const showLoading = useMemo(() => {
    if (isLoading) return true;
    // If we have some book but its id doesn't match the URL param AND we're fetching, show loader
    if (isFetching && book && String(book.id ?? book._id) !== String(id)) {
      return true;
    }
    return false;
  }, [isLoading, isFetching, book, id]);

  if (showLoading) {
    return <Loader></Loader>;
  }
  console.log(book);

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
            src={book.imageUrl}
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
// done