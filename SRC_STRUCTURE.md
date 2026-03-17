# CypherSight - Complete Source Structure

## Project Overview
CypherSight is a fraud and scam detection webapp built with modern web technologies. It provides intelligent analysis of messages, URLs, and images with explainable risk scoring and user-friendly interface.

---

## Directory Structure

```
src/
├── lib/
│   ├── constants.js          # App configuration and constants
│   └── helpers.js            # Utility functions (date formatting, debounce, throttle, storage)
│
├── components/
│   ├── Header.tsx            # Navigation header with brand and menu
│   ├── Footer.tsx            # Footer with links and legal notes
│   ├── CircularStats.tsx      # Interactive circular stat cards (hover enlargement)
│   └── ToneBlock.tsx          # Risk level display component
│
└── pages/
    ├── Dashboard.tsx         # Main dashboard with stats and module cards
    ├── MessageCheck.tsx       # Message fraud analysis page
    ├── UrlCheck.tsx          # URL fraud analysis page
    └── ImageCheck.tsx        # Image manipulation detection page
```

---

## Component Details

### **lib/constants.js**
Global configuration and constants.
- App name, version, and description
- API base URL
- Error and success messages
- Risk threshold levels
- Tone color mapping

### **lib/helpers.js**
Reusable utility functions.
- `formatDate()` - Convert dates to readable format
- `formatTime()` - Convert times to readable format
- `debounce()` - Debounce function for optimized callbacks
- `throttle()` - Throttle function for rate limiting
- `storageHelpers` - LocalStorage CRUD operations

### **components/Header.tsx**
Sticky navigation header with:
- Brand logo (CS badge) with CypherSight title
- Desktop navigation links
- Mobile hamburger menu with collapse animation
- Smooth scrolling to sections
- Responsive design

### **components/Footer.tsx**
Footer with:
- Company description
- Module links (Dashboard, Messages, URL, Image checks)
- Safety guidelines note
- Copyright and branding

### **components/CircularStats.tsx**
Interactive stat display with:
- 3 circular cards (Active Users, Scams Detected, Accuracy)
- Color-coded designs (cyan, purple, green)
- Dual-border ring design
- Hover scale animation (10% enlargement)
- Smooth shadow and glow transitions
- Responsive sizing (160px mobile, 192px desktop)

### **components/ToneBlock.tsx**
Risk assessment display showing:
- Fraud percentage
- Dynamic color coding (green <50%, yellow 50-70%, red >70%)
- Monospace font for technical appearance

### **pages/Dashboard.tsx**
Main dashboard featuring:
- Hero card with overview
- CircularStats component integration
- 3-column layout with module cards
- Sample output panel with risk assessment
- Navigation to other modules
- Responsive grid layout

### **pages/MessageCheck.tsx**
Message analysis interface with:
- Input textarea for message pasting
- Real-time fraud detection scoring
- Signal detection (OTP, urgency, payment context, links)
- Detailed justification output
- Suggested actions based on risk level
- Color-coded risk indicators

### **pages/UrlCheck.tsx**
URL analysis interface with:
- URL input field
- Scam signal detection (shortened links, weak schemes, credential bait)
- Fraud percentage calculation
- Justification and action recommendations
- Visual feedback with tone blocks

### **pages/ImageCheck.tsx**
Image analysis interface with:
- File upload with image preview
- Morphing/manipulation detection scoring
- Demo analysis with file size considerations
- Detailed justification and action guidance
- Support for multiple image formats

---

## Design System

### Color Palette
- **Primary**: Cyan (#06b6d4) - Main accent color
- **Secondary**: Purple (#a855f7) - Stats accent
- **Success**: Green (#10b981) - Low risk
- **Warning**: Yellow (#eab308) - Medium risk
- **Danger**: Red (#ef4444) - High risk
- **Background**: Slate-950 (#0f172a) - Dark cyber aesthetic
- **Neutral**: Gray scale for text

### Typography
- **Headings**: Bold, white color for contrast
- **Body**: Gray-300 for readability
- **Labels**: Gray-400 for secondary text
- **Monospace**: Font-mono for data/scores (cyan accent)

### Components
- **cyber-card**: Base card with border and backdrop blur
- **status-danger/warning/secure**: Colored status badges
- **glow-cyan**: Shadow glow effect for emphasis
- **scanlines**: Retro scan line overlay effect

---

## Key Features

### 1. Interactive Circular Stats
- 3 metrics displayed in circular cards
- Hover enlargement with smooth transitions
- Color-coded (cyan, purple, green)
- Dual-border ring design with gradient overlay
- Shadow and glow effects on hover

### 2. Fraud Detection Analysis
- Real-time signal detection
- Explainable risk scoring (0-100%)
- Color-coded risk levels
- Actionable recommendations
- Demo mode with pattern matching

### 3. Multi-Module Detection
- **Messages**: Text-based scam detection
- **URLs**: Link safety analysis
- **Images**: Morphing/deepfake detection

### 4. User-Friendly Interface
- Responsive design (mobile-first)
- Smooth animations and transitions
- Clear visual hierarchy
- Cybersecurity aesthetic with neon accents
- Sticky navigation header

---

## Responsive Breakpoints

- **Mobile**: Full-width, single column
- **Tablet (md)**: 2-column layouts
- **Desktop (lg)**: 3-column layouts with optimized spacing

---

## File Integration Guide

To use these components in your Next.js app:

```tsx
import Header from '@/components/Header';
import Dashboard from '@/pages/Dashboard';
import MessageCheck from '@/pages/MessageCheck';
import { formatDate } from '@/lib/helpers';
```

---

## Styling Notes

- Uses **Tailwind CSS v4** with custom design tokens
- Dark theme (color-scheme: dark)
- Gradient overlays for depth
- Backdrop blur for glass morphism effect
- CSS custom properties for theme colors

---

## Security Notes

- Client-side validation only (for demo purposes)
- Use proper backend API for real fraud detection
- Implement rate limiting on production
- Sanitize inputs before processing
- Add proper CSRF protection for file uploads

---

## Future Enhancements

1. Backend API integration for real ML models
2. User authentication and account management
3. History and saved analyses
4. Batch analysis capabilities
5. Advanced filters and search
6. Export/report generation
7. Multi-language support

---

Generated: 2026
Version: 1.0.0
