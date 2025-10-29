import UseAxiosSecure from '@/axios/UseAxiosSecure';
import { useAuth } from '@/firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftRight } from 'lucide-react';
import { format } from 'date-fns';

type Trade = {
  _id: string;
  sender: { _id: string; email: string; displayName: string; image: string };
  senderbook: {
    _id: string;
    title: string;
    author: string;
    price: number;
    imageUrl: string;
  };
  receiver: { _id: string; email: string; displayName: string; image: string };
  receiverbook: {
    _id: string;
    title: string;
    author: string;
    price: number;
    imageUrl: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TradeAPI = { error: string; data: Trade[]; message: string };

const RequestedTrades = () => {
  const axiosSecure = UseAxiosSecure();
  const { dbUser } = useAuth();

  const { data: requestedtrades, isLoading } = useQuery<TradeAPI>({
    queryKey: ['requestedtrades', dbUser?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/trades/requested-trades/${dbUser?._id}`
      );
      return res.data;
    },
    enabled: !!dbUser?._id,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  const trades = requestedtrades?.data || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Requested Trades
      </h1>

      {trades.length === 0 ? (
        <Card className="p-6 text-center text-muted-foreground">
          No requested trades found.
        </Card>
      ) : (
        <div className="space-y-4">
          {trades.map((trade) => (
            <Card
              key={trade._id}
              className="hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-5">
                {/* Left side: Book info */}
                <div className="flex items-center gap-6 w-full md:w-2/3">
                  {/* Sender Book */}
                  <div className="flex items-center gap-3 w-1/2">
                    <img
                      src={trade.senderbook.imageUrl}
                      alt={trade.senderbook.title}
                      className="w-14 h-20 rounded-md object-cover shadow-sm"
                    />
                    <div>
                      <p className="font-medium">{trade.senderbook.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {trade.senderbook.author}
                      </p>
                    </div>
                  </div>

                  {/* Arrow icon */}
                  <ArrowLeftRight className="text-muted-foreground shrink-0" />

                  {/* Receiver Book */}
                  <div className="flex items-center gap-3 w-1/2">
                    <img
                      src={trade.receiverbook.imageUrl}
                      alt={trade.receiverbook.title}
                      className="w-14 h-20 rounded-md object-cover shadow-sm"
                    />
                    <div>
                      <p className="font-medium">{trade.receiverbook.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {trade.receiverbook.author}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right side: Receiver + Status + Button */}
                <div className="flex flex-col md:items-end w-full md:w-1/3 gap-2">
                  {/* Receiver */}
                  <div className="flex items-center gap-3">
                    <img
                      src={trade.receiver.image}
                      alt={trade.receiver.displayName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {trade.receiver.displayName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {trade.receiver.email}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <Badge variant="secondary" className="mt-2 w-fit">
                    {trade.status}
                  </Badge>

                  {/* Date */}
                  <p className="text-xs text-muted-foreground">
                    Requested on{' '}
                    {format(new Date(trade.createdAt), 'MMMM do, yyyy')}
                  </p>

                  {/* Action */}
                  <Button
                    variant="outline"
                    disabled
                    className="mt-2 opacity-70 cursor-not-allowed"
                  >
                    Awaiting Receiver
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestedTrades;
