import CircularStats from '../components/CircularStats'

function SideCard({ title, description, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cyber-card rounded-lg p-6 cursor-pointer hover:border-cyan-500/60 transition group"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <div className="font-semibold text-white">{title}</div>
          </div>
          <p className="text-sm text-gray-400 mt-2">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard({ setCurrentPage }) {
  const output = {
    percent: 78,
    justification:
      'Detected urgency/pressure language, suspicious payment request pattern, and shortened link behavior commonly seen in scam campaigns.',
    action:
      'Do not click links or share OTP. Verify the sender via official channels, report the message, and block the contact if untrusted.',
  }

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Card */}
      <div className="cyber-card rounded-lg p-8 md:p-12 overflow-hidden relative mb-12">
        <div className="absolute inset-0 opacity-30 scanlines pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-block mb-4 px-3 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/30">
            <span className="text-sm font-mono text-cyan-400">CypherSight Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Detection Performance</h1>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl">
            Monitor usage, detection performance, and quickly jump into message, URL, and image checks.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setCurrentPage('messages')}
              className="px-6 py-2.5 rounded-lg border border-gray-300/30 text-gray-300 font-medium hover:border-gray-300/60 transition"
            >
              Check a message
            </button>
            <button
              onClick={() => setCurrentPage('urls')}
              className="px-6 py-2.5 rounded-lg bg-cyan-500/90 text-black font-semibold hover:bg-cyan-400 transition glow-cyan"
            >
              Check a URL
            </button>
          </div>
        </div>
      </div>

      {/* Circular Stats */}
      <CircularStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        {/* Sidebar with module cards */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          <SideCard
            icon="💬"
            title="Messages Check"
            description="Paste a message and get fraud likelihood + justification."
            onClick={() => setCurrentPage('messages')}
          />
          <SideCard
            icon="🔗"
            title="URL Check"
            description="Analyze suspicious links for common scam signals."
            onClick={() => setCurrentPage('urls')}
          />
          <SideCard
            icon="🖼️"
            title="Image Check"
            description="Upload an image to check for morphing/manipulation cues."
            onClick={() => setCurrentPage('images')}
          />
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-3">
          <div className="cyber-card rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <div className="font-semibold text-white">Sample Detection Output</div>
                <div className="text-xs text-gray-400 mt-1">
                  Color coding: less than 50% green, 50–70% yellow, over 70% red
                </div>
              </div>
              <div className="flex gap-2">
                <span className="status-danger">78% Fraud Risk</span>
              </div>
            </div>

            <div className="mb-4 p-3 rounded-lg bg-slate-900/50 border border-cyan-500/20">
              <p className="text-sm text-gray-300 italic">
                "Urgent payment required! Click here to verify your account or it will be suspended."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-cyan-500/20">
                <div className="font-semibold text-white text-sm mb-2">Justification</div>
                <p className="text-sm text-gray-400">{output.justification}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-cyan-500/20">
                <div className="font-semibold text-white text-sm mb-2">Recommended Action</div>
                <p className="text-sm text-gray-400">{output.action}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recent Detections</h2>
        <div className="cyber-card rounded-lg p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyan-500/20">
                <th className="text-left py-3 px-4 text-cyan-400">Type</th>
                <th className="text-left py-3 px-4 text-cyan-400">Risk Level</th>
                <th className="text-left py-3 px-4 text-cyan-400">Time</th>
                <th className="text-left py-3 px-4 text-cyan-400">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-cyan-500/10 hover:bg-slate-900/50 transition">
                <td className="py-3 px-4">Message</td>
                <td className="py-3 px-4">
                  <span className="status-danger">HIGH</span>
                </td>
                <td className="py-3 px-4 text-gray-400">2 min ago</td>
                <td className="py-3 px-4 text-green-400">Flagged</td>
              </tr>
              <tr className="border-b border-cyan-500/10 hover:bg-slate-900/50 transition">
                <td className="py-3 px-4">URL</td>
                <td className="py-3 px-4">
                  <span className="status-warning">MEDIUM</span>
                </td>
                <td className="py-3 px-4 text-gray-400">5 min ago</td>
                <td className="py-3 px-4 text-yellow-400">Suspicious</td>
              </tr>
              <tr className="border-b border-cyan-500/10 hover:bg-slate-900/50 transition">
                <td className="py-3 px-4">Image</td>
                <td className="py-3 px-4">
                  <span className="status-secure">LOW</span>
                </td>
                <td className="py-3 px-4 text-gray-400">12 min ago</td>
                <td className="py-3 px-4 text-green-400">Clear</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
