import { useNavigate, Link } from 'react-router-dom';

type ApiBook = {
  _id?: string;
  id?: string;
  title: string;
  author: string;
  isbn?: string;
  ISBN?: string;
  location?: string;
  Location?: string;
  condition?: string;
  Condition?: string;
  exchangeType?: string;
  Exchange?: string;
  language?: string;
  Language?: string;
  category?: string;
  tags?: string[];
  price?: number;
  description?: string;
  image?: string;
  imageUrl?: string;
};

type BookCardProps = { book: ApiBook };

const BookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();
  const bookId = book.id ?? book._id;
  const img = book.image ?? book.imageUrl;
  const location = book.location ?? book.Location;
  const condition = book.condition ?? book.Condition;
  const exchangeType = book.exchangeType ?? book.Exchange;
  const language = book.language ?? book.Language;

  const handleCardClick = () => {
    if (bookId) navigate(`/book/${bookId}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="cursor-pointer rounded-xl border border-sand-200 bg-white p-5 shadow-subtle hover:shadow-md transition-shadow"
    >
      {/* Book image */}
      <div className="h-40 w-full overflow-hidden rounded-md bg-sand-100/60">
        <img
          src={img!}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Title + Author */}
      <h3 className="mt-3 font-semibold text-soil-900">{book.title}</h3>
      <p className="text-sm text-sand-700">
        {book.author} · {language}
      </p>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {location && (
          <span className="rounded bg-sand-100 px-2 py-1">{location}</span>
        )}
        {condition && (
          <span className="rounded bg-sand-100 px-2 py-1">{condition}</span>
        )}
        {exchangeType && (
          <span className="rounded bg-sand-100 px-2 py-1">{exchangeType}</span>
        )}
      </div>

      {/* View Details link */}
      {bookId && (
        <Link
          to={`/book/${bookId}`}
          onClick={(e) => e.stopPropagation()}
          className="mt-4 inline-block text-sm text-blue-600 hover:underline"
        >
          View Details →
        </Link>
      )}
    </article>
  );
};

export default BookCard;
