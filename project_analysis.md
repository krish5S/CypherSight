# CypherSight — Project Analysis

## 🔍 What is CypherSight?

**CypherSight** is a **fraud & scam detection web application** that lets users analyze **messages, URLs, and images** for scam signals. It provides explainable risk scores (0–100%) and actionable guidance to protect against fraud.

> [!NOTE]
> Team name: **BigDawgs** · Version: **1.0.0** · License: MIT

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 (JSX/TSX) |
| **Bundler** | Vite 5 |
| **Styling** | Tailwind CSS v4 + PostCSS |
| **UI Library** | shadcn/ui (57 components installed) |
| **Language** | JavaScript (JSX) + some TypeScript (TSX) |
| **Animations** | tw-animate-css |

---

## 📁 Project Structure

The project has **two parallel codebases**:

### 1. Main App Entry (`app/`)  — Next.js-style layout
- [page.tsx](file:///c:/Users/admin/OneDrive/coding/BigDawgs_CypherSight/app/page.tsx) — Single-page landing with all sections inlined (~296 lines)
- [layout.tsx](file:///c:/Users/admin/OneDrive/coding/BigDawgs_CypherSight/app/layout.tsx) — Root layout
- [globals.css](file:///c:/Users/admin/OneDrive/coding/BigDawgs_CypherSight/app/globals.css) — Global styles

### 2. Vite SPA Source (`lib/src/`) — Modular component architecture
- [App.jsx](file:///c:/Users/admin/OneDrive/coding/BigDawgs_CypherSight/lib/src/App.jsx) — Main app with client-side routing via `useState`
- **Components:** Header, Footer, CircularStats, ToneBlock
- **Pages:** Dashboard, MessageCheck, UrlCheck, ImageCheck
- **Lib:** constants.js, helpers.js (utilities)

### 3. UI Components (`components/ui/`) — 57 shadcn/ui components
Includes: Button, Card, Dialog, Sidebar, Toast, Tabs, Chart, Form, and more.

---

## ✅ Work Completed So Far

### Landing Page / Home
- ✅ Hero section with gradient text, CTA buttons, and scanline overlay
- ✅ Interactive circular stat cards (Active Users: 567, Scams Detected: 1.2K, Accuracy: 92.4%)
- ✅ Hover animations with scale, glow, and shadow effects
- ✅ Detection Modules grid (Messages, URLs, Images) with click navigation

### Navigation & Layout
- ✅ Sticky header with brand logo (CS badge), desktop nav links
- ✅ Mobile responsive hamburger menu
- ✅ Footer with module links, company info, and legal notes
- ✅ Client-side page routing (`useState`-based)

### Detection Modules (All 3 built)
| Module | Features |
|---|---|
| **MessageCheck** | Textarea input, real-time signal detection (OTP, urgency, payment, links), risk scoring, justification, suggested actions |
| **UrlCheck** | URL input, scam signal detection (shortened links, weak schemes, credential bait), fraud %, recommendations |
| **ImageCheck** | File upload + preview, morphing/manipulation detection, file size analysis, detailed justification |

### Dashboard
- ✅ Overview hero card
- ✅ CircularStats integration
- ✅ 3-column module card layout with navigation
- ✅ Sample output panel with risk assessment demo

### Design System
- ✅ Dark cyber aesthetic (Slate-950 background)
- ✅ Color-coded risk levels (green < 50%, yellow 50-70%, red > 70%)
- ✅ Custom CSS classes: `cyber-card`, `status-danger/warning/secure`, `glow-cyan`, `scanlines`
- ✅ Glassmorphism with backdrop blur
- ✅ Responsive breakpoints (mobile, tablet, desktop)

### Utilities
- ✅ `formatDate()`, `formatTime()` — date formatting
- ✅ `debounce()`, `throttle()` — performance helpers
- ✅ `storageHelpers` — LocalStorage CRUD operations
- ✅ Risk threshold constants and tone color mapping

---

## ⚠️ Current Gaps & Issues

| Issue | Detail |
|---|---|
| **No backend / API** | All detection is client-side pattern matching (demo mode). No ML model integration yet |
| **Dual codebase confusion** | `app/page.tsx` (Next.js-style) and `lib/src/App.jsx` (Vite SPA) appear to be overlapping implementations. The Vite config points to the Vite SPA, but `app/` follows Next.js conventions |
| **No routing library** | Navigation uses `useState` instead of React Router or file-based routing |
| **No authentication** | No user accounts or session management |
| **No history/persistence** | Scan results are not saved; no analysis history |
| **Static stats** | The circular stat values (567, 1.2K, 92.4%) are hardcoded |
| **README is empty** | Only contains `# CypherSight` — no setup instructions, features, or documentation |
| **No git commits** | Repository appears to have no commit history |
| **Mixed JSX/TSX** | Some files are `.jsx`, others are `.tsx` — inconsistent typing |

---

## 🚀 Suggested Next Steps

1. **Consolidate the codebase** — Pick either the Vite SPA (`lib/src/`) or the `app/` structure and remove the other
2. **Add React Router** — Replace `useState`-based navigation with proper client-side routing
3. **Backend API integration** — Connect to actual ML models for fraud detection (the `SRC_STRUCTURE.md` lists this as a planned enhancement)
4. **Flesh out the README** — Add project description, setup instructions, screenshots, and feature list
5. **Initialize git properly** — Make an initial commit with all current work
6. **Add TypeScript consistently** — Convert all `.jsx` files to `.tsx` for type safety
7. **Implement analysis history** — Use localStorage or a backend to save past scans

---

## 📊 Summary

| Metric | Value |
|---|---|
| **Total source files** | ~20 (excluding node_modules & shadcn/ui) |
| **UI Components (shadcn)** | 57 pre-built |
| **Custom Components** | 4 (Header, Footer, CircularStats, ToneBlock) |
| **Pages** | 5 (Home, Dashboard, MessageCheck, UrlCheck, ImageCheck) |
| **Overall Completion** | **~40-50%** — Frontend shell is solid, but no backend, no real ML, no auth, no persistence |

> [!IMPORTANT]
> The frontend is well-designed with a polished cyber/neon aesthetic and responsive layout. The primary gap is the **absence of a backend API** for real fraud detection — all current analysis is client-side pattern matching for demonstration purposes.
