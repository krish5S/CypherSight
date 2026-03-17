'use client';

import { useState } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-md">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white">
              CS
            </div>
            <div>
              <div className="font-bold text-lg">CypherSight</div>
              <div className="text-xs text-cyan-400">Fraud & Scam Intelligence</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#dashboard" className="text-sm text-gray-300 hover:text-cyan-400 transition">
              Dashboard
            </a>
            <a href="#messages" className="text-sm text-gray-300 hover:text-cyan-400 transition">
              Messages
            </a>
            <a href="#urls" className="text-sm text-gray-300 hover:text-cyan-400 transition">
              URLs
            </a>
            <a href="#images" className="text-sm text-gray-300 hover:text-cyan-400 transition">
              Images
            </a>
          </div>
        </nav>
      </header>

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
                <a
                  href="#dashboard"
                  className="px-6 py-3 rounded-lg bg-cyan-500/90 text-black font-semibold hover:bg-cyan-400 transition glow-cyan"
                >
                  Start Scanning
                </a>
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
        <section className="mb-16">
          <div className="flex justify-center items-center gap-8 lg:gap-12 flex-wrap">
            {/* Active Users Circle */}
            <div className="group perspective">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 transition-transform duration-300 ease-out hover:scale-110 cursor-pointer">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/40 group-hover:border-cyan-500/70 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <div className="absolute inset-2 rounded-full border border-cyan-500/20 group-hover:border-cyan-500/40 transition-all duration-300"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-5xl lg:text-6xl font-bold text-cyan-400 font-mono">567</div>
                  <div className="text-xs lg:text-sm text-gray-400 mt-2">Active Users</div>
                  <div className="text-xs text-gray-500 mt-1">Online now</div>
                </div>
              </div>
            </div>

            {/* Scams Detected Circle */}
            <div className="group perspective">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 transition-transform duration-300 ease-out hover:scale-110 cursor-pointer">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/40 group-hover:border-purple-500/70 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50"></div>
                <div className="absolute inset-2 rounded-full border border-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-5xl lg:text-6xl font-bold text-purple-400 font-mono">1.2K</div>
                  <div className="text-xs lg:text-sm text-gray-400 mt-2">Scams Detected</div>
                  <div className="text-xs text-gray-500 mt-1">Total detections</div>
                </div>
              </div>
            </div>

            {/* Accuracy Rate Circle */}
            <div className="group perspective">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 transition-transform duration-300 ease-out hover:scale-110 cursor-pointer">
                <div className="absolute inset-0 rounded-full border-2 border-green-500/40 group-hover:border-green-500/70 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-500/50"></div>
                <div className="absolute inset-2 rounded-full border border-green-500/20 group-hover:border-green-500/40 transition-all duration-300"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 group-hover:from-green-500/20 group-hover:to-emerald-500/20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-5xl lg:text-6xl font-bold text-green-400 font-mono">92.4%</div>
                  <div className="text-xs lg:text-sm text-gray-400 mt-2">Accuracy Rate</div>
                  <div className="text-xs text-gray-500 mt-1">Detection accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="dashboard" className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Detection Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Messages Check */}
            <div className="cyber-card rounded-lg p-6 group hover:border-cyan-500/60">
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
            <div className="cyber-card rounded-lg p-6 group hover:border-cyan-500/60">
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
            <div className="cyber-card rounded-lg p-6 group hover:border-cyan-500/60">
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
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">⚠️ Treat Results as Guidance</h3>
              <p className="text-gray-300 text-sm">
                CypherSight provides intelligent analysis but is not a replacement for human judgment. Always verify sources independently.
              </p>
            </div>
            <div className="cyber-card rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">🔐 Never Share Credentials</h3>
              <p className="text-gray-300 text-sm">
                Legitimate organizations will never ask for OTP, passwords, or personal details via message, email, or unsolicited links.
              </p>
            </div>
            <div className="cyber-card rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">🔗 Verify Official Channels</h3>
              <p className="text-gray-300 text-sm">
                When in doubt, contact organizations directly through official phone numbers or verified websites, not links in messages.
              </p>
            </div>
            <div className="cyber-card rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">📢 Report & Block</h3>
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
            <a
              href="#dashboard"
              className="inline-block px-8 py-3 rounded-lg bg-cyan-500/90 text-black font-semibold hover:bg-cyan-400 transition glow-cyan"
            >
              Launch Dashboard
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-2">CypherSight</h3>
              <p className="text-gray-400 text-sm">
                Intelligent fraud detection using AI to protect against scams and malicious content.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-cyan-400 text-sm uppercase mb-4">Modules</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Messages Check</li>
                <li>URL Check</li>
                <li>Image Check</li>
                <li>Dashboard</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-cyan-400 text-sm uppercase mb-4">Legal</h3>
              <p className="text-gray-400 text-sm">
                Treat results as guidance. Always verify sources and avoid sharing personal information or OTPs.
              </p>
            </div>
          </div>
          <div className="border-t border-cyan-500/20 pt-8 flex flex-col md:flex-row justify-content-between items-center gap-4 text-sm text-gray-500">
            <div>© {new Date().getFullYear()} CypherSight. All rights reserved.</div>
            <div>Built for fraud detection and user protection.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
