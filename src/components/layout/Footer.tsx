import FooterColumn from './FooterColumn'
import SocialIcons from './SocialIcons'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-sand-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://i.ibb.co.com/N2jf7kL4/550265142-1124024862503275-6787426305608102088-n.png"
              alt="ShelfShare logo"
              className="h-9 w-9 rounded"
            />
            <span className="text-xl font-semibold text-soil-900">ShelfShare</span>
          </div>
          <p className="text-sand-700 text-sm">Community, Exchange, and Sustainability for book lovers.</p>
        </div>
        <FooterColumn title="Platform" links={[
          { label: 'About Us', to: '/about' },
          { label: 'How It Works', to: '/how-it-works' },
          { label: 'Sustainability Mission', to: '/sustainability' },
        ]} />
        <FooterColumn title="Community" links={[
          { label: 'Leaderboard', to: '/leaderboard' },
          { label: 'Local Events', to: '/events' },
          { label: 'Blog', to: '/blog' },
        ]} />
        <FooterColumn title="Support" links={[
          { label: 'Help Center / FAQ', to: '/help' },
          { label: 'Contact Us', to: '/contact' },
          { label: 'Dispute Resolution', to: '/disputes' },
        ]} />
      </div>
      <div className="border-t border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <SocialIcons />
          <p className="text-xs text-sand-700">© 2025 ShelfShare by Syntax Surfers!</p>
        </div>
      </div>
    </footer>
  )
}


