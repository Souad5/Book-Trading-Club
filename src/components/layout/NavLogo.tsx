import {Link} from "react-router-dom"
export default function NavLogo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src="https://i.ibb.co.com/Mkkv0g6P/booklogo.png"
        alt="ShelfShare logo"
        className="h-8 w-8 rounded"
      />
      <span className="text-lg font-semibold text-soil-900">ShelfShare</span>
    </Link>
  )
}


