import PageHeader from '../components/PageHeader.jsx'
import InfoRow from '../components/InfoRow.jsx'
import PhotoCard from '../components/PhotoCard.jsx'
import { profile } from '../data/profile.js'

export default function About() {
  return (
    <div className="view view-about">
      <PageHeader title="About Me" />

      <div className="about-layout">
        <div className="about-photo-col">
          <PhotoCard src={profile.photo} alt={`Photo of ${profile.name}`} />
        </div>

        <div className="about-main-col">
          <p className="about-bio">{profile.bioLong}</p>

          <div className="info-panel">
            <InfoRow label="Name" value={profile.name} />
            <InfoRow label="Role" value={profile.role} />
            <InfoRow label="University" value={profile.university} />
            <InfoRow
              label="Interests"
              value={
                <span className="tag-list">
                  {profile.focusAreas.map((area) => (
                    <span className="tag" key={area}>
                      {area}
                    </span>
                  ))}
                </span>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
