import { motion } from 'framer-motion';
import UseAxiosSecure from '@/axios/UseAxiosSecure';
import ShareModal from '@/components/Modals/ShareModal';
import Loader from '@/components/SharedComponents/Loader';
import { useFavorites } from '@/hooks/useFavorites';
import { useQuery } from '@tanstack/react-query';
import { Heart, MoveLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// API shape coming from your Mongoose model
type ApiBook = {
  _id: string;
  title: string;
  author: string;
  ISBN?: string;
  Location?: string;
  Condition?: string;
  Exchange?: string;
  Language?: string;
  category: string;
  tags?: string[];
  price: number;
  description: string;
  imageUrl: string;
};

export default function BookDetails() {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const { toggleFavorite, isFavorite, isAuthenticated } = useFavorites(); // Use favorites hook

  const { id } = useParams<{ id: string }>();
  const axiosSecure = UseAxiosSecure();

  const {
    data: book,
    isLoading,
    isFetching,
    isError,
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

  const handleWishlistClick = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add books to favorites');
      return;
    }

    const bookId = book?._id;
    if (!bookId) {
      toast.error('Book ID is not available');
      return;
    }

    const wasFavorite = isFavorite(bookId);
    const success = await toggleFavorite(bookId);

    if (success) {
      const bookTitle = book?.title || 'Unknown Book';
      if (wasFavorite) {
        toast.success(`"${bookTitle}" removed from favorites`, {
          toastId: `remove-${bookId}`,
        });
      } else {
        toast.success(`"${bookTitle}" added to favorites`, {
          toastId: `add-${bookId}`,
        });
      }
    } else {
      toast.error('Failed to update favorites');
    }
  };

  const currentBookId = book?._id;
  const showLoading =
    isLoading || (isFetching && book && String(currentBookId) !== String(id));

  if (showLoading) return <Loader />;

  if (isError) {
    return <div className="p-6">❌ Failed to load book details.</div>;
  }

  if (!book) return <div className="p-6">❌ Book not found.</div>;

  const shareBook =
    currentBookId != null
      ? {
          id: String(currentBookId),
          title: book.title,
          author: book.author,
        }
      : null;

  return (
    <motion.section
      className="p-6 max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/browse" className="text-black text-sm flex gap-2 items-center  rounded-full px-4 border border-black transition-all duration-300 hover:bg-gray-600 hover:border-none hover:text-white p-2 w-[10rem]">
        <MoveLeft className='pt-1' />
        Back to Browse
      </Link>

      <motion.div
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 60 }}
      >
        {/* Book Image */}
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </motion.div>

        {/* Book Info */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-soil-900">{book.title}</h1>
          <p className="text-lg text-sand-700">by {book.author}</p>
          {book.ISBN && (
            <p className="text-sm text-sand-500">ISBN: {book.ISBN}</p>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm mt-4">
            {book.Location && (
              <p>
                <strong>Location:</strong> {book.Location}
              </p>
            )}
            {book.Condition && (
              <p>
                <strong>Condition:</strong> {book.Condition}
              </p>
            )}
            {book.Exchange && (
              <p>
                <strong>Exchange:</strong> {book.Exchange}
              </p>
            )}
            {book.Language && (
              <p>
                <strong>Language:</strong> {book.Language}
              </p>
            )}
            {book.category && (
              <p className="col-span-2">
                <strong>Genre:</strong> {book.category}
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

          {/* Action Buttons */}
          <motion.div className="flex items-center gap-4 mt-6">
            <button className="px-5 py-2.5 bg-leaf-500 hover:bg-leaf-600 text-white rounded-lg shadow transition">
              Trade Now
            </button>

            {isFavorite(book?._id) ? (
              <motion.button
                onClick={handleWishlistClick}
                className="flex items-center gap-2 px-5 py-2.5 hover:bg-leaf-600 hover:text-white text-gray-500 font-semibold bg-[#faf8f4] border border-gray-300 rounded-lg shadow transition"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                Remove from Wishlist
              </motion.button>
            ) : (
              <motion.button
                onClick={handleWishlistClick}
                className="flex items-center gap-2 px-5 py-2.5 hover:bg-leaf-600 hover:text-white text-gray-500 font-semibold bg-[#faf8f4] border border-gray-300 rounded-lg shadow transition"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <Heart className="w-5 h-5 text-gray-400 hover:text-red-400" />
                Add to wishlist
              </motion.button>
            )}

            {shareBook && <ShareModal book={shareBook} />}
          </motion.div>

          {/* Rate & Review Section */}
          <motion.div className="mt-8 p-4 border border-sand-200 rounded-lg bg-sand-50">
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
              placeholder="Write your review..."
              className="w-full p-2 border border-sand-300 rounded-md text-sm"
            />

            <button className="mt-3 px-4 py-2 bg-leaf-500 text-white rounded-lg hover:bg-leaf-600 transition">
              Submit Review
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
