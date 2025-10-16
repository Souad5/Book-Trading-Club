import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiPlus, FiLogOut, FiSun, FiHeart, FiBell, FiX } from "react-icons/fi";
import NavLogo from "./NavLogo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import { useAuth } from "./../../firebase/AuthProvider";
import notify from "@/lib/notify";

export default function Navbar() {
  const { user, signOutUser } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOutUser();
      notify.success("Logged out successfully");
      navigate("/"); // redirect to homepage after logout
    } catch (error: any) {
      notify.error(`Logout failed: ${error.message}`);
    }
  };

  const isAuthenticated = !!user;

  // Notifications state captured from notify events
  type Notice = { id: string; type: 'success' | 'error' | 'info' | 'warning'; message: string; ts: number };
  const [notices, setNotices] = useState<Notice[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { type: Notice['type']; message: string; ts: number } | undefined;
      if (!detail) return;
      setNotices(prev => [{ id: `${detail.ts}-${Math.random().toString(36).slice(2)}`, ...detail }, ...prev].slice(0, 10));
    };
    window.addEventListener('app:notify', handler as EventListener);
    return () => window.removeEventListener('app:notify', handler as EventListener);
  }, []);

  const unreadCount = useMemo(() => notices.length, [notices]);

  // (dark mode removed)

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
              {isAuthenticated && (
                <NavLink to="/wishlist" className={linkClasses}>
                  <div className="flex items-center gap-1">
                    <FiHeart className="w-4 h-4" />
                    <span>Favourite</span>
                  </div>
                </NavLink>
              )}
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
            {!isAuthenticated ? (
              <>
                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition" aria-label="Dark mode">
                  <FiSun className="h-5 w-5 text-orange-500" />
                </button>
                <NavLink to="/login" className="btn-link">
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn-primary bg-leaf-600 text-white hover:bg-leaf-700"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 relative">
                  <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition" aria-label="Dark mode">
                    <FiSun className="h-5 w-5 text-orange-500" />
                  </button>

                  {/* Notifications */}
                  <div className="relative">
                    <button
                      aria-label="Notifications"
                      className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                      onClick={() => setNotifOpen(v => !v)}
                    >
                      <FiBell className="h-5 w-5 text-gray-700" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold">
                          {Math.min(unreadCount, 9)}{unreadCount > 9 ? '+' : ''}
                        </span>
                      )}
                    </button>

                    {notifOpen && (
                      <div className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-lg border border-sand-200 bg-white shadow-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-sand-200">
                          <span className="text-sm font-semibold text-soil-900">Notifications</span>
                          <button className="text-xs text-blue-600 hover:underline" onClick={() => setNotices([])}>Clear all</button>
                        </div>
                        <ul className="max-h-80 overflow-auto">
                          {notices.length === 0 ? (
                            <li className="px-4 py-6 text-sm text-sand-600">No notifications yet</li>
                          ) : (
                            notices.map(n => (
                              <li key={n.id} className="px-4 py-3 flex items-start gap-2 border-b border-sand-100 last:border-b-0">
                                <span className={`mt-0.5 inline-block h-2 w-2 rounded-full ${n.type === 'success' ? 'bg-green-500' : n.type === 'error' ? 'bg-red-500' : n.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
                                <div className="flex-1">
                                  <div className="text-sm text-soil-900">{n.message}</div>
                                  <div className="text-[10px] text-sand-500">{new Date(n.ts).toLocaleTimeString()}</div>
                                </div>
                                <button className="text-sand-400 hover:text-sand-700" onClick={() => setNotices(prev => prev.filter(x => x.id !== n.id))}>
                                  <FiX className="h-4 w-4" />
                                </button>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* User Menu */}
                  <UserMenu />
                </div>
              </>
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
          {isAuthenticated && (
            <NavLink to="/wishlist" className={linkClasses}>
              <div className="flex items-center gap-2">
                <FiHeart className="w-4 h-4" />
                <span>Favourite</span>
              </div>
            </NavLink>
          )}
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
              <button
                onClick={handleLogout}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 transition"
              >
                <FiLogOut /> Logout
              </button>
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