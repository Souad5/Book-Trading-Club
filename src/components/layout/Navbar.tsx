import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiBell, FiHeart, FiMail, FiPlus } from "react-icons/fi";
import NavLogo from "./NavLogo";
import SearchBar from "./SearchBar";
// import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import { useAuth } from "./../../firebase/AuthProvider";

export default function Navbar() {
  const { user, signOutUser } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOutUser();
      alert("Logged out successfully");
    } catch (error: any) {
      alert(`Logout failed: ${error.message}`);
    }
  };

  const isAuthenticated = !!user;

  // Helper for active NavLink
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-leaf-700 bg-leaf-100"
        : "text-gray-700 hover:text-leaf-700 hover:bg-gray-100"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-sand-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <NavLogo />
          </div>

          {/* Center: Navigation + Search */}
          <div className="hidden md:flex flex-1 px-6 items-center justify-center gap-6">
            <nav className="flex gap-4">
              <NavLink to="/" className={linkClasses}>
                Home
              </NavLink>
              <NavLink to="/browse" className={linkClasses}>
                Browse
              </NavLink>
              <NavLink to="/about" className={linkClasses}>
                About
              </NavLink>
              <NavLink to="/contact" className={linkClasses}>
                Contact
              </NavLink>
            </nav>

            {isAuthenticated && (
              <div className="w-full max-w-lg ml-6">
                <SearchBar />
              </div>
            )}
          </div>

          {/* Right: Auth actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle button */}
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
                <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
              </div>
              <span className="ml-2 text-sm text-gray-700"></span>
            </label>

            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <UserMenu />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <UserMenu />
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            className="md:hidden p-2 rounded hover:bg-sand-100"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-sand-200 bg-white px-4 py-4 space-y-2">
          <NavLink to="/" className={linkClasses}>
            Home
          </NavLink>
          <NavLink to="/browse" className={linkClasses}>
            Browse
          </NavLink>
          <NavLink to="/about" className={linkClasses}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClasses}>
            Contact
          </NavLink>

          {isAuthenticated ? (
            <>
              <Link
                to="/add-book"
                className="btn-primary w-full inline-flex gap-2 items-center justify-center mt-3 bg-leaf-600 text-white hover:bg-leaf-700"
              >
                <FiPlus />
                <span>Add Book</span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3 mt-3">
              <NavLink to="/login" className="btn-link">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn-primary bg-leaf-600 text-white hover:bg-leaf-700"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
