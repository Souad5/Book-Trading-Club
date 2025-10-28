import UseAxiosSecure from '@/axios/UseAxiosSecure';
import { useAuth } from '@/firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';

type Order = {
  _id: string;
  user: {
    _id: string;
    email: string;
    displayName: string;
  };
  book: {
    _id: string;
    title: string;
    author: string;
  };
  createdAt: string;
  updatedAt: string;
};

type OrderAPI = {
  error: boolean;
  message: string;
  data: Order[] | null;
};

const MyCart = () => {
  const axiosSecure = UseAxiosSecure();
  const { dbUser } = useAuth();
  const {
    data: cartitems,
    isPending,
    isFetching,
  } = useQuery<OrderAPI>({
    queryKey: ['jobs'], // new key: all users
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/cart/${dbUser?._id}`); // no email filter
      return res.data;
    },
  });
  if (isPending || isFetching) {
    return <div>Loading...</div>;
  }
  console.log(cartitems?.data);
  return (
    <div>
      <h1>This is My Cart Page</h1>
    </div>
  );
};

export default MyCart;
