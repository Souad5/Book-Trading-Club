import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: implement navigate to search results
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <input
        className="w-full rounded-md border border-sand-300 bg-white px-10 py-2 text-sm placeholder-sand-500 focus:outline-none focus:ring-2 focus:ring-leaf-300"
        placeholder="Search by title, author, or ISBN"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="absolute left-2 top-1/2 -translate-y-1/2 text-sand-500 hover:text-soil-700">
        <FiSearch />
      </button>
    </form>
  )
}


