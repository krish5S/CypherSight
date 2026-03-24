import { useState } from 'react'

function toneForPercent(p) {
  if (p < 50) return 'green'
  if (p > 70) return 'red'
  return 'yellow'
}

export default function ImageCheck({ setCurrentPage }) {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [result, setResult] = useState(null)

  const onPick = (f) => {
    setFile(f)
    setResult(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(f ? URL.createObjectURL(f) : null)
  }

  const demoAnalyze = () => {
    if (!file) return

    const sizeMb = file.size / (1024 * 1024)
    const score = Math.max(25, Math.min(90, 45 + Math.round(sizeMb * 10)))
    setResult({
      percent: score,
      justification:
        'This is a demo score. Hook this screen to your morphed-image model to produce real manipulation indicators (e.g., face boundary artifacts, inconsistent lighting, compression anomalies).',
      action:
        score > 70
          ? 'Treat as high-risk. Request a fresh capture (live photo/video), verify from official ID sources, and avoid trusting the image alone.'
          : score < 50
            ? 'Low risk suggested. Still verify with secondary signals if the context is sensitive.'
            : 'Moderate risk. Ask for additional verification (alternate angle, video call, metadata).',
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
        <h2 className="text-3xl font-bold text-white mt-3 mb-2">Image Check</h2>
        <p className="text-gray-300">
          Upload an image to estimate manipulation risk and get suggested actions.
        </p>
      </div>

      {/* Input/Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="cyber-card rounded-lg p-6">
          <div className="font-semibold text-white mb-4">Input</div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onPick(e.target.files?.[0] ?? null)}
            className="w-full p-3 rounded-lg bg-slate-900 border border-cyan-500/20 text-white cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30"
          />

          {previewUrl ? (
            <div className="p-3 rounded-lg bg-slate-900/50 border border-cyan-500/20 mt-4">
              <img src={previewUrl} alt="Preview" className="w-full rounded-lg" />
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-slate-900/50 border border-cyan-500/20 mt-4 text-gray-400 text-center py-8">
              Choose an image to preview here.
            </div>
          )}

          <div className="flex items-center justify-between gap-3 mt-4">
            <div className="text-sm text-gray-400">Tip: best results with clear, uncompressed images.</div>
            <button
              onClick={demoAnalyze}
              disabled={!file}
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
