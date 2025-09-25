import { useState } from "react";
import { motion } from "framer-motion";

const AddBookForm = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cover, setCover] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, author, category, price, description, cover });
    alert("Book submitted!");
  };
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add a New Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-leaf-400 outline-none"
            placeholder="Enter book title"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-leaf-400 outline-none"
            placeholder="Enter author name"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-leaf-400 outline-none"
            required
          >
            <option value="">Select category</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-fiction</option>
            <option value="education">Education</option>
            <option value="comics">Comics</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-leaf-400 outline-none"
            placeholder="Enter price"
            required
            min="0"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-leaf-400 outline-none resize-none"
            placeholder="Write a short description"
            rows={4}
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files ? e.target.files[0] : null)}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-leaf-500 text-white font-semibold py-3 rounded-xl shadow-md hover:opacity-90 transition"
        >
          Add Book
        </motion.button>
      </form>
    </div>
  );
};

export default AddBookForm;
