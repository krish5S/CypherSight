import { useNavigate } from 'react-router-dom'
import { MessageSquareWarning, LinkIcon, ImageIcon, ShieldCheck } from 'lucide-react'

function SideCard({ icon: Icon, title, description, color, onClick }: any) {
  return (
    <div 
      onClick={onClick}
className={`cyber-card rounded-xl p-6 cursor-pointer group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 group-hover:bg-${color}-500/20 group-hover:border-${color}-500/40 transition-colors`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="font-semibold text-lg text-white mb-1 group-hover:text-cyan-50">{title}</div>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <main className="container mx-auto px-4 py-8 md:py-16">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-16 border border-cyan-500/20 bg-slate-900/50 backdrop-blur-xl group">
        <div className="absolute inset-0 opacity-20 scanlines pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-slate-900/50 to-blue-900/20 pointer-events-none" />

        <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-mono tracking-wide backdrop-blur-md">
              <ShieldCheck className="w-4 h-4" />
              <span>CypherSight Active Engine</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Detect Fraud & Scams{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Instantly
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Advanced heuristics and zero-shot AI models to analyze suspicious texts, risky links, and manipulated images in real-time.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => navigate('/messages')}
                className="px-8 py-3.5 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-0.5"
              >
                Scan a Message
              </button>
              <button
                onClick={() => navigate('/urls')}
                className="px-8 py-3.5 rounded-lg border border-slate-700 bg-slate-800/50 text-white font-medium hover:border-cyan-500/50 hover:bg-slate-800 transition-all hover:-translate-y-0.5"
              >
                Check a URL
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative w-64 h-64">
             {/* Decorative Element */}
             <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
             <div className="absolute inset-4 border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
             <div className="absolute inset-8 border border-blue-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
             <ShieldCheck className="absolute inset-0 m-auto w-24 h-24 text-cyan-400/80 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          </div>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <h2 className="text-2xl font-bold text-white mb-6 px-2">Analysis Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <SideCard
          icon={MessageSquareWarning}
          title="Message Analysis"
          description="Paste SMS, emails, or chat messages. Evaluates urgency, phishing keywords, and structural anomalies."
          color="cyan"
          onClick={() => navigate('/messages')}
        />
        <SideCard
          icon={LinkIcon}
          title="URL Threat Check"
          description="Analyzes domain age, top-level domains, obfuscation, and follow redirects to uncover hidden threats."
          color="blue"
          onClick={() => navigate('/urls')}
        />
        <SideCard
          icon={ImageIcon}
          title="Deepfake Detection"
          description="Upload media. Analyzes metadata, error-level compression artifacts, and color layout consistencies."
          color="emerald"
          onClick={() => navigate('/images')}
        />
      </div>
    </main>
  )
}