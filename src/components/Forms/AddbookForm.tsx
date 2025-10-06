import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import FileInput from "./Input";
import UseAxiosSecure from "@/axios/UseAxiosSecure";
import { useAuth } from "@/firebase/AuthProvider";
import { ImSpinner3 } from "react-icons/im";
const AddBookForm = () => {
  const { user } = useAuth();

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ImageURL, setImageURL] = useState<string>("");
  const [cover, setCover] = useState<File | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const axiosSecure = UseAxiosSecure();
    e.preventDefault();
    setSaving(true);
    const file = cover;
    console.log(file);
    const data = new FormData();
    data.append("file", file as Blob);
    data.append("upload_preset", "Syntax_Surfers_cloudinary");
    data.append("cloud_name", "dbduiiimr");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbduiiimr/image/upload",
      { method: "POST", body: data }
    );
    const uploaded = await res.json();
    const url = uploaded.secure_url || uploaded.url;
    if (!url) throw new Error("No URL returned from Cloudinary");
    setImageURL(uploaded.secure_url || uploaded.url);
    await console.log(ImageURL);
    if (!file) return toast.error("Please upload a cover image.");
    console.log({
      title,
      author,
      category,
      price,
      description,
      cover,
      coverUrl: url,
    });
    const newBook = {
      title,
      author,
      category,
      price,
      description,
      imageUrl: url,
      uid: user?.uid,
    };
    console.log(newBook);
    await axiosSecure
      .post("/api/books", newBook)
      .then(() => toast.success("Book added successfully!"))
      .catch((err) => {
        console.log(`❌ Error adding donation:`, err);
        toast.error("Failed to add book. Please try again.");
      });
    setSaving(false);

    // Clear form
    setTitle("");
    setAuthor("");
    setCategory("");
    setPrice("");
    setDescription("");
    setImageURL("");
    setCover(null);
  };
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl  px-8 pb-8 mt-10">
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
          <label className="block text-gray-700 font-medium mb-1">
            Category
          </label>
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
          <label className="block text-gray-700 font-medium mb-1">
            Price ($)
          </label>
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
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-leaf-400 outline-none resize-none"
            placeholder="Write a short description"
            rows={4}
          />
        </div>

        {/* Cover Image */}
        <FileInput
          label="Cover Image"
          accept="image/*"
          onSelect={(file) => setCover(file)}
          fileName={cover?.name}
        />

        {/* Submit Button */}
        {!saving && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-leaf-500 text-white font-semibold py-3 rounded-xl shadow-md hover:opacity-90 transition"
          >
            Add Book
          </motion.button>
        )}
        {saving && (
          <motion.button
            // whileHover={{ scale: 1.05 }}
            // whileTap={{ scale: 0.95 }}
            type="submit"
            disabled
            className="w-full flex items-center justify-center gap-3 bg-leaf-200 text-white font-semibold py-3 rounded-xl shadow-md "
          >
            <ImSpinner3 className="animate-spin text-2xl" />
            Adding
          </motion.button>
        )}
      </form>
    </div>
  );
};

export default AddBookForm;
