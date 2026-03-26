import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

function toneForPercent(p) {
  if (p < 50) return 'green'
  if (p > 70) return 'red'
  return 'yellow'
}

export default function MessageCheck() {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const canAnalyze = text.trim().length > 0 && !isLoading

  const handleAnalyze = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:8000/analyze/phishing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: text }),
      })
      if (!response.ok) {
        throw new Error('Analysis failed')
      }
      const data = await response.json()
      setResult({
        percent: data.percent,
        justification: data.justification,
        action: data.action,
      })
    } catch (error) {
      console.error(error)
      setResult({
        percent: 0,
        justification: 'Error connecting to the server. Please ensure the backend is running.',
        action: 'Check your connection or try again later.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const tone = useMemo(() => toneForPercent(result?.percent ?? 0), [result?.percent])

  const getRiskColor = () => {
    if (!result) return 'text-gray-400'
    if (result.percent < 50) return 'text-green-400'
    if (result.percent > 70) return 'text-red-400'
    return 'text-yellow-400'
  }

  const getRiskBadgeClass = () => {
    if (!result) return ''
    if (result.percent < 50) return 'status-secure'
    if (result.percent > 70) return 'status-danger'
    return 'status-warning'
  }

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Card */}
      <div className="cyber-card rounded-lg p-6 mb-8">
        <div className="inline-block mb-4 px-3 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/30">
          <span className="text-sm font-mono text-cyan-400">CypherSight</span>
        </div>
        <h2 className="text-3xl font-bold text-white mt-3 mb-2">Messages Check</h2>
        <p className="text-gray-300">
          Paste the message content below to estimate fraud likelihood and get a justification.
        </p>
      </div>

      {/* Input/Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="cyber-card rounded-lg p-6">
          <div className="font-semibold text-white mb-4">Input</div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste suspicious SMS/WhatsApp/email text here..."
            className="w-full p-3 rounded-lg bg-slate-900 border border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-500/40 focus:outline-none mb-4"
            rows={7}
          />
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-gray-400">Tip: include the exact wording (no edits).</div>
            <button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className="px-4 py-2 rounded-lg bg-cyan-500/90 text-black font-semibold hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed glow-cyan"
            >
              {isLoading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="cyber-card rounded-lg p-6">
          <div className="font-semibold text-white mb-4">Output</div>
          {result ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className={`text-4xl font-bold font-mono ${getRiskColor()}`}>{result.percent}%</div>
                <span className={getRiskBadgeClass()}>
                  {result.percent < 50 ? 'LOW RISK' : result.percent > 70 ? 'HIGH RISK' : 'MEDIUM RISK'}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-cyan-500/20">
                <div className="text-sm font-semibold text-white mb-2">Justification</div>
                <p className="text-sm text-gray-400">{result.justification}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-cyan-500/20">
                <div className="text-sm font-semibold text-white mb-2">Suggested Action</div>
                <p className="text-sm text-gray-400">{result.action}</p>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-slate-900/50 border border-cyan-500/20 text-gray-400">
              Run an analysis to see fraud percentage, justification, and suggested action.
            </div>
          )}
        </div>
      </div>

      {/* Back button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 rounded-lg border border-cyan-500/30 text-cyan-400 font-medium hover:border-cyan-500/60 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  )
}
