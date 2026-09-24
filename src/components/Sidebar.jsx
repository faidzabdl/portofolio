import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  UserRound,
  Code2,
  Compass,
  Layers3,
  FolderGit2,
  Mail,
} from 'lucide-react'
import { profile } from '../data/profile.js'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/about', label: 'About', icon: UserRound },
  { to: '/skills', label: 'Skills', icon: Code2 },
  { to: '/experience', label: 'Experience', icon: Compass },
  { to: '/services', label: 'Services', icon: Layers3 },
  { to: '/portfolio', label: 'Portfolio', icon: FolderGit2 },
  { to: '/contact', label: 'Contact', icon: Mail },
]

export default function Sidebar({ isOpen, onNavigate }) {
  return (
    <aside className={`sidebar ${isOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark" aria-hidden="true">F</span>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">{profile.name}</span>
          <span className="sidebar-brand-role">{profile.role}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onNavigate}
                className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`}
              >
                <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-status">
        <span className="status-label">Status</span>
        <span className="status-value">
          <span className="status-dot" aria-hidden="true" />
          Available for insternship / Collaboration 
        </span>
      </div>
    </aside>
  )
}
