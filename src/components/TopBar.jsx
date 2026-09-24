import { Menu, Sun, Moon } from 'lucide-react'

export default function TopBar({ currentTitle, onMenuClick, theme, onToggleTheme }) {
  const isLight = theme === 'light'

  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar-menu-btn"
        onClick={onMenuClick}
        aria-label="Toggle navigation menu"
      >
        <Menu size={19} strokeWidth={1.75} />
      </button>

      <div className="topbar-path">
        <span>FAIDZ</span>
        <span className="topbar-path-sep" aria-hidden="true">/</span>
        <span className="topbar-path-current">{currentTitle}</span>
      </div>

      <div className="topbar-meta">
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-pressed={isLight}
          aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {isLight ? <Moon size={16} strokeWidth={1.75} /> : <Sun size={16} strokeWidth={1.75} />}
        </button>
        <span className="topbar-year">2026</span>
      </div>
    </header>
  )
}
