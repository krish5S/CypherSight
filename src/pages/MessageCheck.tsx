import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, PhishingResponse } from '../lib/api'
import { MessageSquareWarning, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Activity } from 'lucide-react'

function toneForPercent(p: number) {
  if (p < 50) return 'green'
  if (p > 70) return 'red'
  return 'yellow'
}

export default function MessageCheck() {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [result, setResult] = useState<PhishingResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const canAnalyze = text.trim().length > 0 && !isLoading

  const handleAnalyze = async () => {
    try {
      setIsLoading(true)
      setErrorMsg(null)
      const data = await api.analyzePhishing(text)
      setResult(data)
    } catch (error) {
      console.error(error)
      setErrorMsg('Error connecting to the server. Please ensure the backend is running.')
    } finally {
      setIsLoading(false)
    }
  }

  const riskScore = result?.risk_score ?? 0
  const tone = useMemo(() => toneForPercent(riskScore), [riskScore])

  const getRiskColor = () => {
    if (!result) return 'text-slate-500'
    if (result.risk_level === 'LOW') return 'text-emerald-400'
    if (result.risk_level === 'HIGH') return 'text-rose-500'
    return 'text-amber-400'
  }

  const getRiskBg = () => {
    if (!result) return 'bg-slate-900 border-slate-800'
    if (result.risk_level === 'LOW') return 'bg-emerald-500/10 border-emerald-500/20'
    if (result.risk_level === 'HIGH') return 'bg-rose-500/10 border-rose-500/20'
    return 'bg-amber-500/10 border-amber-500/20'
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-cyan-500/10 rounded-2xl mb-4 border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
           <MessageSquareWarning className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Message Analysis</h1>
        <p className="text-slate-400">
          Paste suspicious SMS, WhatsApp, or email text below to estimate fraud likelihood through our zero-shot AI and heuristic engine.
        </p>
      </div>

      {/* Input/Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Input Section */}
        <div className="flex flex-col">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl flex-1 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50" />
            
            <div className="flex items-center gap-2 mb-4">
               <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
               <h2 className="font-semibold text-white tracking-wide">Input Message</h2>
            </div>
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. URGENT: Your account has been temporarily suspended. Click here to verify your identity: http://secure-update-login.com"
              className="flex-1 w-full min-h-[250px] p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-200 placeholder-slate-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none mb-6 resize-y font-mono text-sm leading-relaxed"
            />
            
            <div className="flex items-center justify-between gap-4 mt-auto">
              <div className="text-xs text-slate-500 flex items-center gap-1">
                 <ShieldAlert className="w-4 h-4" /> Tip: paste exact wording
              </div>
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                className="group relative px-6 py-3 rounded-xl bg-white text-slate-950 font-bold hover:bg-cyan-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
              >
                <span className="relative z-10">{isLoading ? 'Processing...' : 'Run Analysis'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />}
                {isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 animate-pulse" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl flex-1 relative flex flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800/20 via-slate-900/0 to-slate-900/0">
            <h2 className="font-semibold text-white tracking-wide mb-6">Threat Intelligence</h2>
            
            {errorMsg && (
               <div className="text-rose-400 p-4 border border-rose-500/30 rounded-xl bg-rose-500/10 mb-4 flex items-start gap-3">
                 <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                 <div>
                   <strong className="block font-medium mb-1">Connection Error</strong>
                   <p className="text-sm opacity-90">{errorMsg}</p>
                 </div>
               </div>
            )}

            {!result && !errorMsg && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 min-h-[250px] border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/20">
                <Activity className="w-12 h-12 mb-3 text-slate-700" />
                <p className="font-medium text-slate-400">Awaiting input data</p>
                <p className="text-sm mt-1">Submit a message to view the risk profile</p>
              </div>
            )}

            {result && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Score Header */}
                <div className={`flex items-center justify-between p-5 rounded-2xl border ${getRiskBg()}`}>
                  <div>
                    <div className="text-sm font-medium text-slate-400 mb-1 uppercase tracking-wider">Overall Risk Score</div>
                    <div className={`text-4xl md:text-5xl font-black tracking-tight ${getRiskColor()}`}>
                      {result.risk_score}%
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-4 py-1.5 rounded-full font-bold text-sm tracking-widest border ${getRiskColor()} border-current mb-2`}>
                      {result.risk_level}
                    </span>
                    {result.risk_level === 'LOW' ? (
                       <CheckCircle2 className={`w-8 h-8 ${getRiskColor()} opacity-80`} />
                    ) : (
                       <AlertTriangle className={`w-8 h-8 ${getRiskColor()} opacity-80`} />
                    )}
                  </div>
                </div>

                {/* Tags / Keywords */}
                {result.signals_detected && result.signals_detected.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Red Flags Detected</div>
                    <div className="flex flex-wrap gap-2">
                      {result.signals_detected.map((signal, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:border-slate-500 hover:bg-slate-700 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          {signal.replace(/\\b/g, '')}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explanation text block */}
                <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800 relative">
                  <div className="absolute top-0 left-4 -translate-y-1/2 bg-slate-900 px-2 text-[10px] font-bold text-cyan-500 tracking-widest uppercase rounded border border-slate-800">
                    AI Analysis Result
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed pt-2">
                    {result.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )

}
