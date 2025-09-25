import type { FC } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  BookOpen,
  AlertCircle,
  Settings,
} from "lucide-react";

const AdminDashboard: FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-2 hover:text-gray-200">
            <Users size={20} /> Users
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-200">
            <BookOpen size={20} /> Books
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-200">
            <BarChart3 size={20} /> Analytics
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-200">
            <AlertCircle size={20} /> Disputes
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-200">
            <Settings size={20} /> Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">
          Dashboard Overview
        </h2>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">1,245</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <h3 className="text-lg font-semibold text-gray-600">
              Active Trades
            </h3>
            <p className="text-3xl font-bold text-green-600">324</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <h3 className="text-lg font-semibold text-gray-600">Disputes</h3>
            <p className="text-3xl font-bold text-red-600">18</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <h3 className="text-lg font-semibold text-gray-600">Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">$2,560</p>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <ul className="space-y-3 text-gray-700">
            <li>📘 New book "Clean Code" added by User #112</li>
            <li>🔄 Trade request approved between User #87 and User #92</li>
            <li>⚠️ Dispute opened by User #140 regarding a damaged book</li>
            <li>💰 Premium exchange completed by User #56</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
