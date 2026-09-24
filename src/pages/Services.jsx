import PageHeader from '../components/PageHeader.jsx'
import { services } from '../data/services.js'

export default function Services() {
  return (
    <div className="view view-services">
      <PageHeader title="What I Do" lead="Areas I'm actively exploring and improving in." />

      <div className="services-grid">
        {services.map(({ title, description, icon: Icon }) => (
          <article className="service-card" key={title}>
            <div className="service-card-icon">
              <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
