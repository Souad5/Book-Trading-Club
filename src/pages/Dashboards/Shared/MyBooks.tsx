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
import { MoreHorizontal, SquareArrowOutUpRight, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const MyBooks = () => {
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const {
    data: books = [],
    isPending,
    refetch: GetBooks,
  } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/books');
      return res.data;
    },
  });

  const handleDelete = async (book: any) => {
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
      <h1 className="mb-5">This is the My Books Page</h1>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
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
            {books.map((book) => (
              <TableRow className="text-center" key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.price} BDT</TableCell>

                {/* Wrap the dropdown button inside a TableCell */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant={'outline'}
                        className="my-2 border-none outline-none focus:outline-none"
                      >
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDelete(book)}
                      >
                        <Trash2 className="text-red-500" />
                        Delete Book
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          navigate(`/book/${book._id}`);
                        }}
                      >
                        <SquareArrowOutUpRight />
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyBooks;
