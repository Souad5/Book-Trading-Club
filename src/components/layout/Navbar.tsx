import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiBell, FiHeart, FiMail, FiPlus, FiUser } from 'react-icons/fi'
import NavLogo from './NavLogo'
import SearchBar from './SearchBar'
import NavLinks from './NavLinks'
import UserMenu from './UserMenu'

export default function Navbar() {
  // TODO: Replace with real auth state
  const [isAuthenticated] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-sand-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo and optional primary CTA */}
          <div className="flex items-center gap-3">
            <NavLogo />
            {isAuthenticated && (
              <Link to="/add-book" className="hidden md:inline-flex btn-primary gap-2">
                <FiPlus />
                <span>Add Book</span>
              </Link>
            )}
          </div>

          {/* Center: Search on desktop for auth users */}
          <div className="hidden md:flex flex-1 px-6">
            {isAuthenticated ? (
              <div className="w-full max-w-2xl mx-auto">
                <SearchBar />
              </div>
            ) : (
              <nav className="mx-auto">
                <NavLinks isAuthenticated={false} orientation="horizontal" />
              </nav>
            )}
          </div>

          {/* Right: Auth actions or icon menu */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <NavLink to="/login" className="btn-link">Login</NavLink>
                <NavLink to="/signup" className="btn-primary">Sign Up</NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to="/wishlist" className="p-2 rounded hover:bg-sand-100" aria-label="Wishlist">
                  <span className="relative inline-flex">
                    <FiHeart className="h-5 w-5" />
                  </span>
                </NavLink>
                <NavLink to="/messages" className="p-2 rounded hover:bg-sand-100" aria-label="Messages">
                  <span className="relative inline-flex">
                    <FiMail className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-leaf-600 px-1 text-[10px] text-white">3</span>
                  </span>
                </NavLink>
                <button className="p-2 rounded hover:bg-sand-100" aria-label="Notifications">
                  <span className="relative inline-flex">
                    <FiBell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-leaf-600 px-1 text-[10px] text-white">5</span>
                  </span>
                </button>
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
            <span className="sr-only">Toggle menu</span>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-sand-200 bg-white">
          <div className="px-4 py-3">
            {isAuthenticated ? (
              <div className="space-y-3">
                <Link to="/add-book" className="btn-primary w-full inline-flex gap-2">
                  <FiPlus />
                  <span>Add Book</span>
                </Link>
                <div>
                  <SearchBar />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <NavLink to="/wishlist" className="p-2 rounded bg-sand-100 text-center">
                    <FiHeart className="mx-auto" />
                    <span className="text-sm">Wishlist</span>
                  </NavLink>
                  <NavLink to="/messages" className="p-2 rounded bg-sand-100 text-center">
                    <FiMail className="mx-auto" />
                    <span className="text-sm">Messages</span>
                  </NavLink>
                  <button className="p-2 rounded bg-sand-100 text-center w-full">
                    <FiBell className="mx-auto" />
                    <span className="text-sm">Alerts</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <FiUser />
                  <span className="font-medium">Account</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/dashboard" className="btn-link">Dashboard</Link>
                  <Link to="/profile" className="btn-link">My Profile</Link>
                  <Link to="/trades" className="btn-link">Trade History</Link>
                  <Link to="/settings" className="btn-link">Settings</Link>
                  <button className="btn-link text-left">Logout</button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <NavLinks isAuthenticated={false} orientation="vertical" />
                <div className="flex items-center gap-3">
                  <NavLink to="/login" className="btn-link">Login</NavLink>
                  <NavLink to="/signup" className="btn-primary">Sign Up</NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}


