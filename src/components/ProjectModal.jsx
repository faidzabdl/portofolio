import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, Check } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeBtnRef = useRef(null)
  // Remembers whichever card was clicked, so focus can go back there on close.
  const lastFocusedRef = useRef(null)

  useEffect(() => {
    if (!project) return

    lastFocusedRef.current = document.activeElement
    closeBtnRef.current?.focus()

    // Stop the page behind the modal from scrolling while it's open.
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      // Keep Tab cycling inside the dialog instead of wandering into the page.
      if (event.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables || focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      lastFocusedRef.current?.focus?.()
    }
  }, [project, onClose])

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="modal"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            // Clicks inside the panel shouldn't bubble up and close it.
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              className="modal-close"
              onClick={onClose}
              ref={closeBtnRef}
              aria-label="Close project details"
            >
              <X size={18} strokeWidth={1.75} />
            </button>

            {project.image && (
              <div className="modal-media modal-media-contain">
                <img src={project.image} alt={`${project.title} cover`} />
              </div>
            )}

            <div className="modal-body">
              <div className="modal-meta">
                <span className="modal-category">{project.category}</span>
                {project.year && <span className="modal-chip">{project.year}</span>}
                {project.status && <span className="modal-chip">{project.status}</span>}
                {project.isUnderDevelopment && (
                  <span className="modal-chip modal-chip-progress">In progress</span>
                )}
              </div>

              <h2 id="project-modal-title" className="modal-title">
                {project.title}
              </h2>

              {project.longDescription?.map((paragraph, index) => (
                <p className="modal-paragraph" key={index}>
                  {paragraph}
                </p>
              ))}

              {project.features?.length > 0 && (
                <section className="modal-section">
                  <h3>Key features</h3>
                  <ul className="modal-features">
                    {project.features.map((feature) => (
                      <li key={feature}>
                        <Check size={14} strokeWidth={2} aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.technologies?.length > 0 && (
                <section className="modal-section">
                  <h3>Tech stack</h3>
                  <span className="tag-list">
                    {project.technologies.map((tech) => (
                      <span className="tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </span>
                </section>
              )}

              {/* Buttons only render when the matching URL exists in the data. */}
              {(project.github || project.demo) && (
                <div className="modal-actions">
                  {project.demo && (
                    <a
                      className="btn btn-primary"
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={15} strokeWidth={1.75} aria-hidden="true" />
                      View live project
                    </a>
                  )}
                  {project.github && (
                    <a
                      className="btn btn-ghost"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github size={15} strokeWidth={1.75} aria-hidden="true" />
                      View on GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
