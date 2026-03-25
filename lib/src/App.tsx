import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CircularStats from './components/CircularStats'
import Dashboard from './pages/Dashboard'
import MessageCheck from './pages/MessageCheck'
import UrlCheck from './pages/UrlCheck'
import ImageCheck from './pages/ImageCheck'

function Home() {
  const navigate = useNavigate()
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-lg border border-cyan-500/30 bg-gradient-to-br from-slate-900/50 via-slate-950/50 to-slate-900/50 p-8 md:p-12 cyber-card">
          <div className="absolute inset-0 opacity-30 scanlines pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-block mb-4 px-3 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/30">
              <span className="text-sm font-mono text-cyan-400">CypherSight v1.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Detect Scams & Fraud
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 ml-2">
                Instantly
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              Analyze messages, URLs, and images for scam signals. Get explainable risk scores and actionable guidance to protect yourself from fraud.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 rounded-lg bg-cyan-500/90 text-black font-semibold hover:bg-cyan-400 transition glow-cyan"
              >
                Start Scanning
              </button>
              <a
                href="#about"
                className="px-6 py-3 rounded-lg border border-cyan-500/30 text-cyan-400 font-semibold hover:border-cyan-500/60 transition"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Interactive Circles */}
      <CircularStats />

      {/* Features */}
      <section id="dashboard" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Detection Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Messages Check */}
          <div
            onClick={() => navigate('/messages')}
            className="cyber-card rounded-lg p-6 group hover:border-cyan-500/60 cursor-pointer transition"
          >
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/30 transition">
                <span className="text-2xl">💬</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Messages Check</h3>
            <p className="text-gray-400 text-sm mb-4">
              Paste any message to analyze fraud likelihood, detect scam patterns, and get detailed justification.
            </p>
            <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition flex items-center gap-2">
              Analyze Message →
            </button>
          </div>

          {/* URL Check */}
          <div
            onClick={() => navigate('/urls')}
            className="cyber-card rounded-lg p-6 group hover:border-cyan-500/60 cursor-pointer transition"
          >
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/30 transition">
                <span className="text-2xl">🔗</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">URL Check</h3>
            <p className="text-gray-400 text-sm mb-4">
              Analyze suspicious links for phishing signals, shortened URL behaviors, and domain reputation.
            </p>
            <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition flex items-center gap-2">
              Check URL →
            </button>
          </div>

          {/* Image Check */}
          <div
            onClick={() => navigate('/images')}
            className="cyber-card rounded-lg p-6 group hover:border-cyan-500/60 cursor-pointer transition"
          >
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/30 transition">
                <span className="text-2xl">🖼️</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Image Check</h3>
            <p className="text-gray-400 text-sm mb-4">
              Upload images to detect morphing, manipulation, and deepfake indicators with AI analysis.
            </p>
            <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition flex items-center gap-2">
              Scan Image →
            </button>
          </div>
        </div>
      </section>

      {/* Risk Scoring */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">How Risk Scoring Works</h2>
        <div className="cyber-card rounded-lg p-8">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Example Analysis Result</h3>
            <p className="text-gray-300 mb-6">
              "Urgent payment required! Click here to verify your account or it will be suspended."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-slate-900/50 border border-cyan-500/20">
              <div className="text-sm text-gray-400 mb-2">Risk Assessment</div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold font-mono text-red-400">78%</div>
                <span className="status-danger">HIGH RISK</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-cyan-500/20">
              <div className="text-sm text-gray-400 mb-2">Detected Patterns</div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✓ Urgency language</li>
                <li>✓ Account threat</li>
                <li>✓ Suspicious link</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-cyan-500/20">
              <div className="text-sm text-gray-400 mb-2">Recommended Action</div>
              <p className="text-sm text-gray-300">
                Do not click. Verify via official app/website. Block contact. Report message.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Safety Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="cyber-card rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Treat Results as Guidance</h3>
            <p className="text-gray-300 text-sm">
              CypherSight provides intelligent analysis but is not a replacement for human judgment. Always verify sources independently.
            </p>
          </div>
          <div className="cyber-card rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Never Share Credentials</h3>
            <p className="text-gray-300 text-sm">
              Legitimate organizations will never ask for OTP, passwords, or personal details via message, email, or unsolicited links.
            </p>
          </div>
          <div className="cyber-card rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Verify Official Channels</h3>
            <p className="text-gray-300 text-sm">
              When in doubt, contact organizations directly through official phone numbers or verified websites, not links in messages.
            </p>
          </div>
          <div className="cyber-card rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Report & Block</h3>
            <p className="text-gray-300 text-sm">
              Report suspicious messages to the platform and block untrusted contacts to protect your network and help others.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <div className="cyber-card rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Yourself?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Start analyzing messages, URLs, and images right now to detect fraud and scams with CypherSight's AI-powered detection.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-block px-8 py-3 rounded-lg bg-cyan-500/90 text-black font-semibold hover:bg-cyan-400 transition glow-cyan"
          >
            Launch Dashboard
          </button>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<MessageCheck />} />
        <Route path="/urls" element={<UrlCheck />} />
        <Route path="/images" element={<ImageCheck />} />
      </Routes>

      <Footer />
    </div>
  )
}
