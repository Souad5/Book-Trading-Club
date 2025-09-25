import { useState } from "react";
import AdminDashboard from "./Admin/AdminDashboard";
import SellerDashboard from "./Seller/SellerDashboard";
// import UserDashboard from "../dashboard/UserDashboard";

function Dashboard() {
  const [role, setRole] = useState<"user" | "seller" | "admin">("user");

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-50 via-sand-100 to-sand-200 p-8">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-soil-800 mb-10 drop-shadow-sm">
        Dashboard
      </h1>

      {/* Role Switcher */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-xl shadow-md overflow-hidden border border-sand-300 bg-white">
          <button
            onClick={() => setRole("user")}
            className={`px-6 py-2 font-medium transition ${
              role === "user"
                ? "bg-leaf-500 text-white"
                : "text-soil-700 hover:bg-sand-100"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setRole("seller")}
            className={`px-6 py-2 font-medium transition ${
              role === "seller"
                ? "bg-sand-500 text-white"
                : "text-soil-700 hover:bg-sand-100"
            }`}
          >
            Seller
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-6 py-2 font-medium transition ${
              role === "admin"
                ? "bg-soil-600 text-white"
                : "text-soil-700 hover:bg-sand-100"
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {role === "admin" && <AdminDashboard />}
        {role === "user" && (
          <div className="text-center text-soil-700">
            <h2 className="text-2xl font-semibold mb-4">Welcome User 👤</h2>
            <p className="text-soil-500">
              Here you can see your books, trades, and wishlist.
            </p>
          </div>
        )}
        {role === "seller" && <SellerDashboard />}
      </div>
    </div>
  );
}

export default Dashboard;
