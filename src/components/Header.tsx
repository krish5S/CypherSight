import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShieldAlert, Menu, X, Activity } from 'lucide-react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Messages', path: '/messages' },
    { label: 'URLs', path: '/urls' },
    { label: 'Images', path: '/images' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="absolute inset-x-0 -bottom-px h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all">
            <ShieldAlert className="w-5 h-5 absolute" />
          </div>
          <div>
            <div className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
              CypherSight
            </div>
            <div className="text-[10px] uppercase tracking-widest text-cyan-400/80 font-mono">
              Fraud Intelligence
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-full border border-white/5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/')
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-cyan-400 bg-slate-800 shadow-sm border border-white/5'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-[1px] h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                )}
                {item.label}
              </Link>
            )
          })}
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
             <Activity className="w-3 h-3 animate-pulse" />
             System Online
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white bg-slate-900 rounded-lg border border-white/5 transition"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl absolute w-full test-xl shadow-2xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/')
              return (
                 <Link
                   key={item.path}
                   to={item.path}
                   onClick={() => setMenuOpen(false)}
                   className={`text-left px-4 py-3 rounded-lg transition-all ${
                     isActive
                       ? 'text-cyan-400 bg-cyan-500/10 font-semibold border border-cyan-500/20'
                       : 'text-gray-400 hover:text-white hover:bg-slate-900 border border-transparent'
                   }`}
                 >
                   {item.label}
                 </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
