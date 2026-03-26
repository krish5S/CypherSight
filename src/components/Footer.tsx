import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowUpRight, Code2, MessagesSquare } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-slate-950 relative overflow-hidden mt-auto">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute -top-40 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="p-1.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                 <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Cypher<span className="text-cyan-400">Sight</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Advanced multi-modal security intelligence. Protecting users from zero-day phishing, deepfakes, and social engineering through continuous AI analysis.
            </p>
          </div>

          <div>
            <h3 className="uppercase text-xs font-bold text-slate-500 tracking-widest mb-4">Threat Vectors</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/messages" className="text-slate-400 hover:text-cyan-400 transition flex items-center group">
                  Message Analysis <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </li>
              <li>
                <Link to="/urls" className="text-slate-400 hover:text-cyan-400 transition flex items-center group">
                  URL Inspection <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </li>
              <li>
                <Link to="/images" className="text-slate-400 hover:text-cyan-400 transition flex items-center group">
                  Deepfake Detection <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="uppercase text-xs font-bold text-slate-500 tracking-widest mb-4">Legal & Ethics</h3>
            <ul className="space-y-3 text-sm">
              <li><span className="text-slate-400 hover:text-white cursor-not-allowed transition">Privacy Protocol</span></li>
              <li><span className="text-slate-400 hover:text-white cursor-not-allowed transition">Terms of Service</span></li>
              <li><span className="text-slate-400 hover:text-white cursor-not-allowed transition">Model Explainability</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500 flex items-center gap-2">
            &copy; {currentYear} <span className="font-semibold text-slate-400">CypherSight Intelligence</span>. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition cursor-pointer">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition cursor-pointer">
               <MessagesSquare className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
