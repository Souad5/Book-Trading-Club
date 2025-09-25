import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiBell, FiHeart, FiMail, FiPlus,  } from "react-icons/fi";
import NavLogo from "./NavLogo";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import { useAuth } from "./../../firebase/AuthProvider"; // use auth context

export default function Navbar() {
  const { user, signOutUser } = useAuth(); // get auth state and logout
  const [mobileOpen, setMobileOpen] = useState(false);
//  console.log(user?.email); // Logs email if user exists, otherwise undefined


  // Handle logout
  const handleLogout = async () => {
    try {
      await signOutUser();
      alert("Logged out successfully");
    } catch (error: any) {
      alert(`Logout failed: ${error.message}`);
    }
  };

  const isAuthenticated = !!user; // true if user is logged in

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-sand-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo and optional primary CTA */}
          <div className="flex items-center gap-3">
            <NavLogo />
            {isAuthenticated && (
              <Link
                to="/add-book"
                className="hidden md:inline-flex btn-primary bg-black gap-2"
              >
                <FiPlus />
                <span>Add Book</span>
                
              </Link>
              
            )}
          </div>

          {/* Center: Search on desktop for auth users */}
          <div className="hidden md:flex flex-1 px-6">
            {/* Always show these links */}
            <nav className="mx-auto">
              <NavLinks isAuthenticated={!!user} orientation="horizontal" />
            </nav>
            {isAuthenticated && (
              <div className="w-full max-w-2xl mx-auto ml-6">
                <SearchBar />
              </div>
            )}
          </div>

          {/* Right: Auth actions or icon menu */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <NavLink to="/login" className="btn-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn-primary text-amber-500">
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/wishlist"
                  className="p-2 rounded hover:bg-sand-100"
                  aria-label="Wishlist"
                >
                  <span className="relative inline-flex">
                    <FiHeart className="h-5 w-5" />
                  </span>
                </NavLink>
                <NavLink
                  to="/messages"
                  className="p-2 rounded hover:bg-sand-100"
                  aria-label="Messages"
                >
                  <span className="relative inline-flex">
                    <FiMail className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-leaf-600 px-1 text-[10px] text-white">
                      3
                    </span>
                  </span>
                </NavLink>
                <button
                  className="p-2 rounded hover:bg-sand-100"
                  aria-label="Notifications"
                >
                  <span className="relative inline-flex">
                    <FiBell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-leaf-600 px-1 text-[10px] text-white">
                      5
                    </span>
                  </span>
                </button>
                <UserMenu />
                <button
                  onClick={handleLogout}
                  className="ml-2 btn-link text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            className="md:hidden p-2 rounded hover:bg-sand-100"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
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

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-sand-200 bg-white">
          <div className="px-4 py-3">
            {/* Always show browse/how it works links */}
            <NavLinks isAuthenticated={!!user} orientation="vertical" />

            {isAuthenticated ? (
              <>
                {/* Auth-only links */}
                <Link
                  to="/add-book"
                  className="btn-primary w-full inline-flex gap-2"
                >
                  <FiPlus />
                  <span>Add Book</span>
                </Link>
                {/* ...other user options */}
              </>
            ) : (
              <div className="flex items-center gap-3">
                <NavLink to="/login" className="btn-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn-primary">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
