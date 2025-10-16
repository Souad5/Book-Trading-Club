// src/pages/Browse.tsx
import { useSearchParams } from 'react-router-dom';
import UseAxiosSecure from '@/axios/UseAxiosSecure.js';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import BookCard from '@/pages/Browse/BookCard';

type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  isbn: string;
  tags: string[];
  location: string;
  condition: string;
  exchangeType: string;
  language: string;
  genre: string;
  image: string;
};

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

// map DB → UI
const normalize = (b: ApiBook): Book => ({
  id: b._id,
  title: b.title,
  author: b.author,
  isbn: b.ISBN ?? 'N/A',
  tags: b.tags ?? [],
  location: b.Location ?? 'Dhaka',
  condition: (b.Condition ?? 'Good').toLowerCase(),
  exchangeType: (b.Exchange ?? 'Swap').toLowerCase(),
  language: b.Language ?? 'English',
  genre: b.category ?? 'Fiction',
  image: b.imageUrl,
  price: b.price,
});

export default function Browse() {
  const [searchParams] = useSearchParams();
  const rawQuery = (searchParams.get('query') || '').trim().toLowerCase();

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

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="gap-5 rounded-2xl border border-sand-200 bg-gradient-to-br from-sand-50 via-white to-leaf-50 p-8 mb-6">
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
        {books.length === 0 ? (
          <div className="col-span-full text-sand-700">No books found.</div>
        ) : (
          books.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
    </section>
  );
}
