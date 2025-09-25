import { useState } from "react";
import AdminDashboard from "../dashboard/AdminDashboard";
// import UserDashboard from "../dashboard/UserDashboard";

function Dashboard() {
  // Normally, you'd get the role from auth context or API
  const [role, setRole] = useState<"admin" | "user">("user");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      {/* Role Switcher (for demo only, remove in production) */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setRole("user")}
          className={`px-4 py-2 rounded-l-lg ${
            role === "user" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          User
        </button>
        <button
          onClick={() => setRole("admin")}
          className={`px-4 py-2 rounded-r-lg ${
            role === "admin" ? "bg-green-600 text-white" : "bg-gray-300"
          }`}
        >
          Admin
        </button>
      </div>

      {/* Conditional Rendering */}
      {role === "admin" ? <AdminDashboard /> : ""}
    </div>
  );
}

export default Dashboard;
