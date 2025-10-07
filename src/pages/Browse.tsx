import { useSearchParams } from 'react-router-dom';

import UseAxiosSecure from '@/axios/UseAxiosSecure.js';
import { useQuery } from '@tanstack/react-query';
import BookCard from '@/Component/BookCard';
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

// --- API shape coming from your Mongoose model ---
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
  tags: string[];
  price: number;
  description: string;
  imageUrl: string;
};

// demo data unchanged (omitted for brevity) …
export const DEMO_BOOKS: Book[] = [
  /* ...same as yours... */
];

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
});

export default function Browse() {
  const [searchParams] = useSearchParams();
  const rawQuery = (searchParams.get('query') || '').trim().toLowerCase();
  const axiosSecure = UseAxiosSecure();

  const {
    data: books, // Book[] after select()
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
    // If you want to see something while refetching-on-focus:
    keepPreviousData: true,
    staleTime: 30_000,
    retry: 1,
  });

  // ---- Render gates ----
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

  // Use API books when available; fall back to demo on error/empty
  const source: Book[] =
    !isError && books && books.length > 0 ? books : DEMO_BOOKS;

  // helpful console for first successful load
  if (books) {
    // eslint-disable-next-line no-console
    console.log('Fetched books:', books);
  } else if (isError) {
    // eslint-disable-next-line no-console
    console.warn(
      'Using demo data because fetch failed:',
      (error as any)?.message ?? error
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
          <div className="col-span-full text-sand-700">
            No books matched your search.
          </div>
        ) : (
          books.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
    </section>
  );
}
