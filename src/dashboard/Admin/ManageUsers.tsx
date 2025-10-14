import React, { useEffect, useState } from "react";

const API = "http://localhost:3000/api/admin/users"; // ⚙️ Adjust for production

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        q: search,
        role: roleFilter,
        page,
      }).toString();
      const res = await fetch(`${API}?${query}`);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter, page]);

  const handleRoleChange = async (uid, role) => {
    const newRole = role === "user" ? "admin" : "user";
    await fetch(`${API}/${uid}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    fetchUsers();
  };

  const handleDelete = async (uid) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await fetch(`${API}/${uid}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Manage Users</h2>
      <p className="text-gray-600 mb-6">
        Here admin can view, promote, or remove users.
      </p>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-2 flex-1"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="mod">Mod</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-50">
                  <td className="p-2 border">{user.displayName}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border capitalize">{user.role}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleRoleChange(user.uid, user.role)}
                      className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
                    >
                      {user.role === "user" ? "Make Admin" : "Make User"}
                    </button>
                    <button
                      onClick={() => handleDelete(user.uid)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
