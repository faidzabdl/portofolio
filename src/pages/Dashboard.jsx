import { Link } from 'react-router-dom'
import { GraduationCap, Building2, Compass, Sparkles } from 'lucide-react'
import PhotoCard from '../components/PhotoCard.jsx'
import { profile } from '../data/profile.js'

const overview = [
  { label: 'Education', value: 'Informatics Engineering', icon: GraduationCap },
  { label: 'University', value: profile.university, icon: Building2 },
  {
    label: 'Focus',
    value: profile.focusAreas.map((f) => f.split(' ')[0]).join(' • '),
    icon: Compass,
  },
  { label: 'Status', value: profile.status, icon: Sparkles },
]

export default function Dashboard() {
  return (
    <div className="view view-dashboard">
      <section className="dashboard-hero">
        <div className="dashboard-hero-main">
          <span className="dashboard-hero-kicker">Welcome to my workspace</span>
          <h1 className="dashboard-hero-title">I&apos;m {profile.name}</h1>
          <p className="dashboard-hero-role">{profile.role}</p>
          <p className="dashboard-hero-intro">{profile.bioShort}</p>

          <div className="dashboard-hero-actions">
            <Link to="/portfolio" className="btn btn-primary">
              Explore Portfolio
            </Link>
            <Link to="/about" className="btn btn-ghost">
              About Me
            </Link>
          </div>
        </div>

        {/* <div className="dashboard-hero-photo">
          <PhotoCard src={profile.photo} alt={`Photo of ${profile.name}`} />
        </div> */}
      </section>

      <section className="dashboard-grid" aria-label="Overview">
        {overview.map(({ label, value, icon: Icon }) => (
          <div className="stat-card" key={label}>
            <Icon size={18} strokeWidth={1.75} className="stat-card-icon" aria-hidden="true" />
            <span className="stat-card-label">{label}</span>
            <span className="stat-card-value">{value}</span>
          </div>
        ))}
      </section>
    </div>
  )
}
