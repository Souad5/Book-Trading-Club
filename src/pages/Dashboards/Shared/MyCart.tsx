import UseAxiosSecure from '@/axios/UseAxiosSecure';
import { useAuth } from '@/firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'react-toastify';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';

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
    ISBN: string;
    Exchange: string;
    price: number;
    imageUrl: string;
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
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Queriers Fetching
  const {
    data: cartitems,
    isPending,
    refetch: GetCart,
    isFetching,
  } = useQuery<OrderAPI>({
    queryKey: ['myCart', dbUser?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/cart/${dbUser?._id}`);
      return res.data;
    },
  });

  //   Handle Functions
  const HandleDeleteCartItem = async (item: Order) => {
    setDeletingId(item._id);
    try {
      await axiosSecure.delete(`/api/cart/${item._id}`);
      GetCart();
      toast.success('Item Deleted Successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete item');
    } finally {
      setDeletingId(null);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-muted-foreground text-lg">
        Loading your cart...
      </div>
    );
  }

  const items = cartitems?.data ?? [];

  const subtotal = items.reduce((acc, item) => {
    const price = item.book.Exchange === 'Donate' ? 0 : item.book.price;
    return acc + price;
  }, 0);

  return (
    <div className="p-6 text-foreground grid lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold flex items-center gap-3">
            <ShoppingCart className="w-7 h-7 text-primary" />
            My Cart
          </h1>
          <p className="text-muted-foreground text-sm">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
            <ShoppingCart className="w-14 h-14 mb-4 opacity-50" />
            <p>Your cart is empty.</p>
          </div>
        ) : (
          items.map((item) => (
            <Card key={item._id} className="transition hover:shadow-md">
              <CardContent className="flex flex-col md:flex-row items-center justify-between p-4">
                {/* Image + Info */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={item.book.imageUrl}
                    alt={item.book.title}
                    className="w-24 h-32 object-cover rounded-md border"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.book.title}</h2>
                    <p className="text-muted-foreground text-sm">
                      {item.book.author}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Added on {format(new Date(item.createdAt), 'PPP')}
                    </p>

                    {/* Price or Donate */}
                    <div className="mt-2 flex items-center gap-2">
                      {item.book.Exchange === 'Donate' ? (
                        <>
                          <p className="line-through text-muted-foreground/70">
                            {item.book.price} ৳
                          </p>
                          <p className="text-green-500 font-semibold">0 ৳</p>
                          <span className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 text-xs px-2 py-0.5 rounded-md">
                            Donated
                          </span>
                        </>
                      ) : (
                        <p className="text-primary font-medium">
                          {item.book.price} ৳
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                {deletingId === item._id ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-500 mt-4 md:mt-0"
                  >
                    <Spinner />
                    Removing...
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive/80 mt-4 md:mt-0"
                    onClick={() => HandleDeleteCartItem(item)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
        {isFetching && (
          <div className="flex w-full max-w-xs mx-auto flex-col gap-4 [--radius:1rem]">
            <Item variant="muted" className="w-full">
              <ItemMedia>
                <Spinner />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1">
                  Refreshing your Cart...
                </ItemTitle>
              </ItemContent>
            </Item>
          </div>
        )}
      </div>

      {/* Checkout Summary */}
      <Card className="h-fit">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Checkout Summary</h2>

          <div className="space-y-3 text-muted-foreground">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal} ৳</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery & Service</span>
              <span>0 ৳</span>
            </div>

            <Separator className="my-3" />

            <div className="flex justify-between font-semibold text-foreground">
              <span>Total</span>
              <span className="text-primary">{subtotal} ৳</span>
            </div>

            {items.some((i) => i.book.Exchange === 'Donate') && (
              <p className="text-green-500 text-sm mt-2">
                {items.filter((i) => i.book.Exchange === 'Donate').length}{' '}
                donated{' '}
                {items.filter((i) => i.book.Exchange === 'Donate').length > 1
                  ? 'items'
                  : 'item'}{' '}
                — price set to 0৳
              </p>
            )}
          </div>

          <Button
            className="w-full mt-6"
            onClick={() => console.log('Checkout')}
          >
            Proceed to Checkout
          </Button>

          <Button
            variant="outline"
            className="w-full mt-3"
            onClick={() => navigate('/browse')}
          >
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyCart;
