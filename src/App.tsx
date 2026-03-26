import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import MessageCheck from './pages/MessageCheck'
import UrlCheck from './pages/UrlCheck'
import ImageCheck from './pages/ImageCheck'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-100">
      <Header />

      <main className="flex-1 flex flex-col relative">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<MessageCheck />} />
          <Route path="/urls" element={<UrlCheck />} />
          <Route path="/images" element={<ImageCheck />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}