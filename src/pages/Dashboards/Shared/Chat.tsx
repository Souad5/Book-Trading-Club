import { useState, useRef } from 'react';
import UseAxiosSecure from '@/axios/UseAxiosSecure';
import { useAuth } from '@/firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Image, Send } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Chat = () => {
  const { id } = useParams();
  const { dbUser } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const [textMessage, setTextMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const messagesEndRef = useRef(null);

  // ✅ Fetch messages
  const { data: messagesResponse, isLoading } = useQuery({
    queryKey: ['messages', id, dbUser?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/messages/get-messages/${id}/${dbUser?._id}`
      );
      return res.data;
    },
    enabled: !!dbUser?._id && !!id,
  });

  const messages = messagesResponse?.data || [];

  // ✅ Handle Send
  const handleSend = () => {
    console.log({
      text: textMessage,
      image: imageFile,
    });
    setTextMessage('');
    setImageFile(null);
  };

  // ✅ Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ✅ Skeleton while loading
  if (isLoading) {
    return (
      <div className="flex flex-col justify-between h-full bg-background rounded-lg">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex gap-2',
                i % 2 === 0 ? 'justify-start' : 'justify-end'
              )}
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-48 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background rounded-lg">
      {/* ====== Chat Messages ====== */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll">
        {messages.length === 0 ? (
          <p className="text-sm text-center text-muted-foreground mt-10">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg) => {
            const isSender = msg.senderId === dbUser?._id;
            return (
              <div
                key={msg._id}
                className={cn(
                  'flex w-full',
                  isSender ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[70%] px-4 py-2 rounded-2xl shadow-sm text-sm',
                    isSender
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  )}
                >
                  {msg.text && <p className="break-words">{msg.text}</p>}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="attachment"
                      className="mt-2 rounded-lg max-h-56 object-cover"
                    />
                  )}
                  <p className="text-[10px] text-muted-foreground text-right mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ====== Chat Input Area ====== */}
      <div className="px-3 pb-20 mt-5 border-t flex items-center gap-3">
        {/* Image Upload */}
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex items-center justify-center p-2 rounded-full hover:bg-muted transition"
        >
          <Image className="size-5 text-muted-foreground" />
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="hidden"
        />

        {/* Text Input */}
        <input
          type="text"
          placeholder="Type your message..."
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Send Button */}
        <Button onClick={handleSend} disabled={!textMessage && !imageFile}>
          <Send className="size-4 mr-1" />
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
