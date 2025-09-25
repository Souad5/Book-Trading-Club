import type { FC } from "react";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  BarChart3,
  
  PlusCircle,
  MessageSquare,
  Settings,
} from "lucide-react";

const SellerDashboard: FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-10">Seller Dashboard</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-2 hover:text-gray-200">
            <Package size={20} /> My Listings
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-200">
            <PlusCircle size={20} /> Add New Book
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-200">
            <ShoppingCart size={20} /> Orders
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-200">
            <MessageSquare size={20} /> Buyer Requests
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-200">
            <BarChart3 size={20} /> Analytics
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-200">
            <Settings size={20} /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome Back, Seller 🛍️
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <h3 className="text-lg font-semibold text-gray-600">Total Sales</h3>
            <p className="text-3xl font-bold text-indigo-600">1,245</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <h3 className="text-lg font-semibold text-gray-600">Active Orders</h3>
            <p className="text-3xl font-bold text-green-600">87</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <h3 className="text-lg font-semibold text-gray-600">Pending Requests</h3>
            <p className="text-3xl font-bold text-yellow-600">15</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <h3 className="text-lg font-semibold text-gray-600">Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">$7,860</p>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Activities</h3>
          <ul className="space-y-3 text-gray-700">
            <li>📘 You added a new listing: *JavaScript: The Good Parts*</li>
            <li>🛒 Order #302 confirmed by Buyer #112</li>
            <li>💰 You earned $120 from Order #298</li>
            <li>📦 Order #310 is awaiting shipment</li>
          </ul>
        </div>

        {/* Quick Action */}
        <div className="mt-10 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md font-medium flex items-center gap-2"
          >
            <PlusCircle size={20} /> Add New Book
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
