export default function Browse() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-2xl border border-sand-200 bg-gradient-to-br from-sand-50 via-white to-leaf-50 p-8 mb-6">
        <h1 className="text-3xl font-semibold text-soil-900 tracking-tight">Browse Books</h1>
        <p className="mt-2 text-sand-700">Discover books available for exchange.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1,2,3,4,5,6].map((i) => (
          <article key={i} className="rounded-xl border border-sand-200 bg-white p-5 shadow-subtle hover:shadow-md transition-shadow">
            <div className="h-28 w-full rounded-md bg-sand-100/60" />
            <h3 className="mt-3 font-semibold text-soil-900">Sample Book {i}</h3>
            <p className="text-sm text-sand-700">Author Name · English</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-sand-100 px-2 py-1">Dhaka</span>
              <span className="rounded bg-sand-100 px-2 py-1">good</span>
              <span className="rounded bg-sand-100 px-2 py-1">swap</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}


