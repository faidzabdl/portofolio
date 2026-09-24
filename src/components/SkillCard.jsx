export default function SkillCard({ skill }) {
  const Icon = skill.icon

  return (
    <article className="skill-card">
      <div className="skill-card-head">
        {Icon && (
          <span className="skill-card-icon">
            <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
          </span>
        )}
        <span className="tag">{skill.category}</span>
      </div>
      <h3 className="skill-card-name">{skill.name}</h3>
      <p className="skill-card-description">{skill.description}</p>
    </article>
  )
}
