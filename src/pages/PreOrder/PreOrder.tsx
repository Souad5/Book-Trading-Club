import { useMemo, useState } from 'react';
import notify from '@/lib/notify';
import { usePreOrders } from '@/hooks/usePreOrders';

type FormState = {
  title: string;
  author: string;
  price: string;
  imageUrl: string;
  description: string;
};

export default function PreOrderPage() {
  const { preOrders, addPreOrder, removePreOrder } = usePreOrders();
  const [form, setForm] = useState<FormState>({
    title: '',
    author: '',
    price: '',
    imageUrl: '',
    description: '',
  });

  const priceNumber = useMemo(() => {
    const n = Number(form.price);
    return Number.isFinite(n) && n >= 0 ? n : NaN;
  }, [form.price]);

  const isValidImage = useMemo(() => {
    if (!form.imageUrl) return false;
    try {
      const u = new URL(form.imageUrl);
      return ['http:', 'https:'].includes(u.protocol);
    } catch {
      return false;
    }
  }, [form.imageUrl]);

  const onChange = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim() || !form.imageUrl.trim()) {
      notify.error('Please fill in title, author, and image link');
      return;
    }
    if (!Number.isFinite(priceNumber)) {
      notify.error('Please provide a valid price');
      return;
    }

    addPreOrder({
      title: form.title.trim(),
      author: form.author.trim(),
      price: priceNumber,
      imageUrl: form.imageUrl.trim(),
      description: form.description.trim() || undefined,
    });
    notify.success('Pre-order added successfully');
    setForm({ title: '', author: '', price: '', imageUrl: '', description: '' });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-2xl border border-sand-200 bg-gradient-to-br from-sand-50 via-white to-leaf-50 p-8 mb-6">
        <h1 className="text-3xl font-semibold text-soil-900 tracking-tight">Pre-Order Book</h1>
        <p className="mt-2 text-sand-700">Submit a request to pre-order a book.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 md:p-8 shadow-subtle border border-sand-200">
          <h2 className="text-lg font-semibold text-soil-900 mb-5">Pre-Order Form</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-sand-700 mb-1">Book Name</label>
              <input
                className="w-full rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-sm"
                value={form.title}
                onChange={onChange('title')}
                placeholder="e.g., The Pragmatic Programmer"
              />
            </div>
            <div>
              <label className="block text-sm text-sand-700 mb-1">Author Name</label>
              <input
                className="w-full rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-sm"
                value={form.author}
                onChange={onChange('author')}
                placeholder="e.g., Andrew Hunt, David Thomas"
              />
            </div>
            <div>
              <label className="block text-sm text-sand-700 mb-1">Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-sm"
                value={form.price}
                onChange={onChange('price')}
                placeholder="e.g., 19.99"
              />
            </div>
            <div>
              <label className="block text-sm text-sand-700 mb-1">Image Link</label>
              <input
                className="w-full rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-sm"
                value={form.imageUrl}
                onChange={onChange('imageUrl')}
                placeholder="https://example.com/cover.jpg"
              />
              {isValidImage && (
                <div className="mt-3">
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-sand-200"
                    onError={(e) => ((e.currentTarget.style.display = 'none'))}
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm text-sand-700 mb-1">Description (optional)</label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-sm"
                value={form.description}
                onChange={onChange('description')}
                placeholder="Why do you want this book?"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-leaf-600 hover:bg-leaf-700 text-white px-4 py-2.5 text-sm font-medium transition"
            >
              Submit Pre-Order
            </button>
          </div>
        </form>

        {/* My Pre-Ordered Books */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-subtle border border-sand-200">
          <h2 className="text-lg font-semibold text-soil-900 mb-5">My Pre-Ordered Books</h2>
          {preOrders.length === 0 ? (
            <p className="text-sand-700">No pre-orders yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {preOrders.map((p) => (
                <div key={p.id} className="border border-sand-200 rounded-xl overflow-hidden">
                  <div className="aspect-[16/10] bg-sand-100">
                    {p.imageUrl && (
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-soil-900 line-clamp-1">{p.title}</h3>
                    <p className="text-sand-700 text-sm mb-1">by {p.author}</p>
                    <p className="text-soil-900 font-medium">৳{p.price.toFixed(2)}</p>
                    {p.description && (
                      <p className="mt-2 text-sand-700 text-sm line-clamp-2">{p.description}</p>
                    )}
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => {
                          removePreOrder(p.id);
                          notify.info('Removed pre-order');
                        }}
                        className="text-sm px-3 py-1.5 rounded-md border border-sand-300 hover:bg-sand-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


