import { useState } from 'react'

export default function Header({ currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Dashboard', page: 'dashboard' },
    { label: 'Messages', page: 'messages' },
    { label: 'URLs', page: 'urls' },
    { label: 'Images', page: 'images' },
  ]

  const handleNavClick = (page) => {
    setCurrentPage(page)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white">
            CS
          </div>
          <div>
            <div className="font-bold text-lg">CypherSight</div>
            <div className="text-xs text-cyan-400">Fraud & Scam Intelligence</div>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`text-sm transition ${
                currentPage === item.page
                  ? 'text-cyan-400 font-semibold'
                  : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-cyan-400 hover:text-cyan-300 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-cyan-500/20 bg-slate-900/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-left px-4 py-2 rounded transition ${
                  currentPage === item.page
                    ? 'text-cyan-400 bg-slate-800/50 font-semibold'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
