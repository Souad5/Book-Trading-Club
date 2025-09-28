import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../../firebase/AuthProvider";
import { FiHeart, FiMail, FiBell, FiLogOut, FiUser, FiSettings, FiBook } from "react-icons/fi";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, signOutUser } = useAuth();

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
      alert("Logged out successfully");
    } catch (error: any) {
      alert(`Logout failed: ${error.message}`);
    }
  };

  return (
    <div className="relative" ref={ref}>
      {/* Profile button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-leaf-600 text-white"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="font-semibold">{user?.email?.[0].toUpperCase() || "U"}</span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 rounded-md border border-sand-200 bg-white p-2 shadow-lg z-50"
        >
          {/* User info */}
          <div className="px-4 py-2 text-sm text-sand-600 border-b border-sand-200">
            {user?.email}
          </div>

          {/* Menu items */}
          <div className="flex flex-col">
            <Link to="/wishlist" className="flex items-center gap-2 px-4 py-2 hover:bg-sand-100 rounded">
              <FiHeart /> Wishlist
            </Link>
            <Link to="/messages" className="flex items-center gap-2 px-4 py-2 hover:bg-sand-100 rounded relative">
              <FiMail /> Messages
              <span className="absolute right-4 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                3
              </span>
            </Link>
            <Link to="/notifications" className="flex items-center gap-2 px-4 py-2 hover:bg-sand-100 rounded relative">
              <FiBell /> Notifications
              <span className="absolute right-4 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                5
              </span>
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-sand-100 rounded">
              <FiBook /> Dashboard
            </Link>
            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-sand-100 rounded">
              <FiUser /> My Profile
            </Link>
            <Link to="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-sand-100 rounded">
              <FiSettings /> Settings
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-left text-red-500 hover:bg-sand-100 rounded"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
