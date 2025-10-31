import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '@/axios/UseAxiosSecure';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  MoreHorizontal,
  Pen,
  SquareArrowOutUpRight,
  Trash2,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/firebase/AuthProvider';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import UpdateBookModal from './UpdateBookModal';

// ✅ Define type for each book
export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
}

const MyBooks = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Fetch user books
  const {
    data: books = [],
    isPending,
    refetch: GetBooks,
  } = useQuery<Book[]>({
    queryKey: ['books', user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/books/get-user-books/${user?.uid}`);
      return res.data;
    },
  });

  // ✅ Delete handler
  const handleDelete = async (book: Book) => {
    const response = await axiosSecure.delete(`/api/books/${book._id}`);
    console.log(response);
    toast.success('Book Deleted Successfully');
    GetBooks();
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-5 text-xl font-semibold">This is the My Books Page</h1>

      {/* Table */}
      <div className="overflow-hidden rounded-md border mb-20">
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Author</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book : any) => (
              <TableRow className="text-center" key={book._id}>
                <TableCell className="flex flex-col items-center justify-center gap-3 mt-4">
                  <img
                    src={book.imageUrl}
                    width={90}
                    height={90}
                    className="object-cover rounded-md"
                    alt={book.title}
                  />
                  {book.title}
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.price} BDT</TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="my-2 border-none outline-none">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem asChild>
                        <Button
                          variant="ghost"
                          className="h-8 px-2 gap-2"
                          onClick={() => handleDelete(book)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Book
                        </Button>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Button
                          variant="ghost"
                          className="h-8 px-2 gap-2"
                          onClick={() => setSelectedBook(book)}
                        >
                          <Pen className="w-4 h-4" />
                          Update Book
                        </Button>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Button
                          variant="ghost"
                          className="h-8 px-2 gap-2"
                          onClick={() => navigate(`/book/${book._id}`)}
                        >
                          <SquareArrowOutUpRight className="w-4 h-4" />
                          View Details
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Dialog outside the table for Update Modal */}
      {selectedBook && (
        <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
          <UpdateBookModal
            bookdata={selectedBook}
            GetBooks={GetBooks}
            setOpen={() => setSelectedBook(null)}
          />
        </Dialog>
      )}
    </div>
  );
};

export default MyBooks;
