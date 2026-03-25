import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-cyan-500/20 bg-slate-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg text-white mb-2">CypherSight</h3>
            <p className="text-gray-400 text-sm">
              Intelligent fraud detection using AI to protect against scams and malicious content.
            </p>
          </div>

          <div>
            <h3 className="uppercase text-sm font-semibold text-cyan-400 mb-4">Modules</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-cyan-400 transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/messages"
                  className="hover:text-cyan-400 transition"
                >
                  Messages Check
                </Link>
              </li>
              <li>
                <Link
                  to="/urls"
                  className="hover:text-cyan-400 transition"
                >
                  URL Check
                </Link>
              </li>
              <li>
                <Link
                  to="/images"
                  className="hover:text-cyan-400 transition"
                >
                  Image Check
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="uppercase text-sm font-semibold text-cyan-400 mb-4">Safety Note</h3>
            <p className="text-gray-400 text-sm">
              Treat results as guidance. Always verify sources and avoid sharing personal information or OTPs.
            </p>
          </div>
        </div>

        <div className="border-t border-cyan-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>&copy; {currentYear} CypherSight. All rights reserved.</div>
          <div>Built for fraud detection and user protection.</div>
        </div>
      </div>
    </footer>
  )
}
