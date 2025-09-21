import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { useAuth } from "./../../firebase/AuthProvider";

export default function UserMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { user } = useAuth();

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-leaf-600 text-white"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="font-semibold">U</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-md border border-sand-200 bg-white p-2 shadow-subtle"
        >
          <div className="px-2 py-1 text-sm text-sand-600">{user?.email}</div>
          <div className="my-1 h-px bg-sand-200" />
          <div className="flex flex-col">
            <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-sand-100">Dashboard</Link>
            <Link to="/profile" className="px-3 py-2 rounded hover:bg-sand-100">My Profile</Link>
            <Link to="/trades" className="px-3 py-2 rounded hover:bg-sand-100">Trade History</Link>
            <Link to="/settings" className="px-3 py-2 rounded hover:bg-sand-100">Settings</Link>
            <button className="px-3 py-2 text-left rounded hover:bg-sand-100">Logout</button>
          </div>
        </div>
      )}
    </div>
  )
}


