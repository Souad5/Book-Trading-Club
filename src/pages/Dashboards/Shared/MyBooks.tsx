import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '@/axios/UseAxiosSecure';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

const MyBooks = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/books');
      return res.data;
    },
  });

  const handleDelete = (book: any) => {
    console.log('Deleted book:', book);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-5">This is the My Books Page</h1>

      {/* Table */}
      <div className="overflow-hidden rounded-md border ">
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              {' '}
              {/* Add text-center class to TableRow */}
              <TableHead className='text-center'>Name</TableHead>
              <TableHead className='text-center'>Author</TableHead>
              <TableHead className='text-center'>Category</TableHead>
              <TableHead className='text-center'>Amount</TableHead>
              <TableHead className='text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow className="text-center" key={book._id}>
                {' '}
                {/* Keep text-center for TableRow in body */}
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.price} BDT</TableCell>
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
                    <DropdownMenuItem className="text-red-500">
                      <Trash2 className="text-red-500" />
                      Delete Book
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SquareArrowOutUpRight />
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyBooks;
