import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="cursor-pointer rounded-xl border border-sand-200 bg-white p-5 shadow-subtle hover:shadow-md transition-shadow"
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
        <span className="rounded bg-sand-100 px-2 py-1">{book.location}</span>
        <span className="rounded bg-sand-100 px-2 py-1">{book.condition}</span>
        <span className="rounded bg-sand-100 px-2 py-1">
          {book.exchangeType}
        </span>
      </div>

      {/* View Details link */}
      <Link
        to={`/book/${book.id}`}
        onClick={(e) => e.stopPropagation()} // prevent double navigation
        className="mt-4 inline-block text-sm text-blue-600 hover:underline"
      >
        View Details →
      </Link>
    </article>
  );
};

export default BookCard;
