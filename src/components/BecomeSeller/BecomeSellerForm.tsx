import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { toast } from "react-toastify";

interface SellerFormData {
  name: string;
  email: string;
  phone: string;
  shopName: string;
  description: string;
  district: string;
  upazila: string;
  photo: File | null;
}

const BecomeSellerForm: React.FC = () => {
  const [formData, setFormData] = useState<SellerFormData>({
    name: "",
    email: "",
    phone: "",
    shopName: "",
    description: "",
    district: "",
    upazila: "",
    photo: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    toast("Congrats! You become a seller now.");

    // TODO: Handle backend submission (Firebase / API)
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-600 rounded-2xl shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        Become a <span className="text-black dark:text-white">Seller</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block font-medium mb-1 dark:text-white"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block font-medium mb-1 dark:text-white"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="example@gmail.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block font-medium mb-1 dark:text-white"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="+8801XXXXXXXXX"
          />
        </div>

        {/* Shop Name */}
        <div>
          <label
            htmlFor="shopName"
            className="block font-medium mb-1 dark:text-white"
          >
            Shop Name
          </label>
          <input
            id="shopName"
            name="shopName"
            type="text"
            required
            value={formData.shopName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your shop name"
          />
        </div>

        {/* Shop Description */}
        <div>
          <label
            htmlFor="description"
            className="block font-medium mb-1 dark:text-white"
          >
            Shop Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="Write about your shop..."
          ></textarea>
        </div>

        {/* District & Upazila */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="district"
              className="block font-medium mb-1 dark:text-white"
            >
              District
            </label>
            <input
              id="district"
              name="district"
              type="text"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter district"
            />
          </div>
          <div>
            <label
              htmlFor="upazila"
              className="block font-medium mb-1 dark:text-white"
            >
              Upazila
            </label>
            <input
              id="upazila"
              name="upazila"
              type="text"
              value={formData.upazila}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter upazila"
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label
            htmlFor="photo"
            className="block font-medium mb-1 dark:text-white"
          >
            Profile Photo
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BecomeSellerForm;
