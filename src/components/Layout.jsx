import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar.jsx'
import TopBar from './TopBar.jsx'
import PageTransition from './PageTransition.jsx'
import { useTheme } from '../hooks/useTheme.js'
import Dashboard from '../pages/Dashboard.jsx'
import About from '../pages/About.jsx'
import Skills from '../pages/Skills.jsx'
import Experience from '../pages/Experience.jsx'
import Services from '../pages/Services.jsx'
import Portfolio from '../pages/Portfolio.jsx'
import Contact from '../pages/Contact.jsx'

const pageTitles = {
  '/': 'Dashboard',
  '/about': 'About',
  '/skills': 'Skills',
  '/experience': 'Experience',
  '/services': 'Services',
  '/portfolio': 'Portfolio',
  '/contact': 'Contact',
}

export default function Layout() {
  const [navOpen, setNavOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const currentTitle = pageTitles[location.pathname] ?? 'Dashboard'

  // Close the mobile nav automatically whenever the route changes.
  useEffect(() => {
    setNavOpen(false)
  }, [location.pathname])

  return (
    <div className="app-shell">
      <Sidebar isOpen={navOpen} onNavigate={() => setNavOpen(false)} />

      {navOpen && (
        <div
          className="nav-overlay"
          onClick={() => setNavOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="app-main">
        <TopBar
          currentTitle={currentTitle}
          onMenuClick={() => setNavOpen((v) => !v)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="app-content" id="main-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Dashboard /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
              <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="*" element={<PageTransition><Dashboard /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>

        <footer className="app-footer">
          <span>© 2026 Faidz Abdul Mazid</span>
          <span className="app-footer-dot" aria-hidden="true">•</span>
          <span>Built with React &amp; Vite</span>
        </footer>
      </div>
    </div>
  )
}
