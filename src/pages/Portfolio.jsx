import { useState } from 'react'
import { FolderGit2, ArrowUpRight } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ProjectModal from '../components/ProjectModal.jsx'
import { projects } from '../data/projects.js'

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <div className="view view-portfolio">
      <PageHeader
        title="Portfolio"
        lead="Select a project to see the full write-up, the tech behind it, and where to view it."
      />

      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              {/* The whole card is one button so it works with mouse,
                  keyboard (Enter / Space) and screen readers alike. */}
              <button
                type="button"
                className="project-card-btn"
                onClick={() => setActiveProject(project)}
                aria-label={`Open details for ${project.title}`}
              >
                {project.image && (
                  <span className="project-card-media">
                    <img src={project.image} alt="" aria-hidden="true" loading="lazy" />
                  </span>
                )}

                <span className="project-card-body">
                  <span className="project-card-top">
                    <span className="project-card-category">{project.category}</span>
                    {project.isUnderDevelopment && (
                      <span className="project-card-progress">In progress</span>
                    )}
                  </span>

                  <span className="project-card-title">{project.title}</span>
                  <span className="project-card-desc">{project.description}</span>

                  {project.technologies?.length > 0 && (
                    <span className="tag-list">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span className="tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="tag">+{project.technologies.length - 3}</span>
                      )}
                    </span>
                  )}

                  <span className="project-card-cta">
                    View details
                    <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                  </span>
                </span>
              </button>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FolderGit2}
          title="Coming soon"
          description="I'm currently building projects that will be showcased here soon."
        />
      )}

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  )
}
