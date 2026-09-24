import { useState } from 'react'
import { Braces, Award } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Marquee from '../components/Marquee.jsx'
import SkillCard from '../components/SkillCard.jsx'
import CertificateCard from '../components/CertificateCard.jsx'
import CertificateModal from '../components/CertificateModal.jsx'
import { skills } from '../data/skills.js'
import { certificates } from '../data/certificates.js'

export default function Skills() {
  const [activeCertificate, setActiveCertificate] = useState(null)

  return (
    <div className="view view-skills">
      <PageHeader
        title="Skills"
        lead="Tools and languages I'm currently practicing and building with. Hover to pause, or drag/swipe to browse manually."
      />

      {skills.length > 0 ? (
        <Marquee ariaLabel="Skills carousel" speed={34}>
          {skills.map((skill) => (
            <SkillCard skill={skill} key={skill.name} />
          ))}
        </Marquee>
      ) : (
        <EmptyState
          icon={Braces}
          title="No skills listed yet"
          description="Skills will appear here as they're added to the data file."
        />
      )}

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-heading-title">Certificates</h2>
          <p className="section-heading-lead">
            Certifications and completion credentials I've earned. Click one for the full
            details.
          </p>
        </div>

        {certificates.length > 0 ? (
          <Marquee ariaLabel="Certificates carousel" speed={30}>
            {certificates.map((certificate) => (
              <CertificateCard
                certificate={certificate}
                onOpen={setActiveCertificate}
                key={certificate.id}
              />
            ))}
          </Marquee>
        ) : (
          <EmptyState
            icon={Award}
            title="Coming soon"
            description="No certificates yet -- they'll show up here once I've earned some."
          />
        )}
      </section>

      <CertificateModal
        certificate={activeCertificate}
        onClose={() => setActiveCertificate(null)}
      />
    </div>
  )
}
