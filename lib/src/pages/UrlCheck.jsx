import { useState } from 'react'

function toneForPercent(p) {
  if (p < 50) return 'green'
  if (p > 70) return 'red'
  return 'yellow'
}

export default function UrlCheck({ setCurrentPage }) {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)

  const demoAnalyze = () => {
    const u = url.trim().toLowerCase()
    const signals = [
      u.includes('bit.ly') || u.includes('tinyurl') ? 'Shortened link' : null,
      u.includes('@') ? 'Username/password pattern (@) in URL' : null,
      u.startsWith('http://') ? 'Insecure HTTP scheme' : null,
      u.includes('login') || u.includes('verify') ? 'Credential / verification bait' : null,
      u.includes('free') || u.includes('gift') ? 'Incentive bait keywords' : null,
    ].filter(Boolean)

    const base = 30
    const score = Math.min(95, base + signals.length * 14)
    setResult({
      percent: score,
      justification:
        signals.length > 0
          ? `Signals detected: ${signals.join(', ')}.`
          : 'No strong URL scam signals detected. Still verify the domain and HTTPS certificate.',
      action:
        score > 70
          ? 'Do not open the link. Verify the domain from an official source and report the URL.'
          : score < 50
            ? 'Proceed carefully. Verify the domain spelling and ensure HTTPS before continuing.'
            : 'Be cautious. Open only if you trust the sender and the domain looks legitimate.',
    })
  }

  const tone = toneForPercent(result?.percent ?? 0)

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
        <h2 className="text-3xl font-bold text-white mt-3 mb-2">URL Check</h2>
        <p className="text-gray-300">Paste a URL to estimate fraud likelihood and get guidance.</p>
      </div>

      {/* Input/Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="cyber-card rounded-lg p-6">
          <div className="font-semibold text-white mb-4">Input</div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/verify"
            className="w-full p-3 rounded-lg bg-slate-900 border border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-500/40 focus:outline-none mb-4"
          />
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-gray-400">Tip: include the full URL (including http/https).</div>
            <button
              onClick={demoAnalyze}
              disabled={url.trim().length === 0}
              className="px-4 py-2 rounded-lg bg-cyan-500/90 text-black font-semibold hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed glow-cyan"
            >
              Analyze
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
          onClick={() => setCurrentPage('dashboard')}
          className="px-6 py-2 rounded-lg border border-cyan-500/30 text-cyan-400 font-medium hover:border-cyan-500/60 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  )
}
