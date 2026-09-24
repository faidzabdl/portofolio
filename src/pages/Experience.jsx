import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkle, Hammer, Hourglass, ChevronDown } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

/*
 * `points` is optional. When a milestone has one or more points, its header
 * becomes clickable and reveals them on click. Leave `points` out (or an
 * empty array) for a milestone that has nothing to expand — it renders as
 * plain, non-interactive text instead.
 */
const milestones = [
  {
    id: 'cv_herbicom',
    year: '2024 (July - August)',
    title: 'Assistant Technician Intern — CV. Herbicom',
    description: 'I was an assistant technician intern at a computer and electronics repair shop.',
    icon: Sparkle,
    state: 'active',
    points: [
      'Learning IT hardware repair and maintenance',
      'Responsible for repairing PCs, reinstalling operating systems, assisting with CCTV installation, and performing other IT maintenance tasks.',
      'For my final internship project, I developed a Kotlin-based Android application to simplify the invoice input process.',
    ],
  },
  // {
  //   id: 'starting-journey',
  //   year: '2026',
  //   title: 'Starting the journey',
  //   description: 'Beginning my path as an Informatics Engineering student.',
  //   icon: Sparkle,
  //   state: 'current',
  //   points: [
  //     'Enrolled in the Informatics Engineering program',
  //     'Set up my development tools and environment',
  //     'Started following the core coursework',
  //   ],
  // },
  // {
  //   id: 'learning-building',
  //   title: 'Learning & building',
  //   description: 'Focusing on fundamentals, coursework, and small personal projects.',
  //   icon: Hammer,
  //   state: 'active',
  //   points: [
  //     'Practicing programming fundamentals, currently with PHP',
  //     'Working through university coursework',
  //     'Building small practice projects to apply what I learn',
  //   ],
  // },
  // {
  //   id: 'future-experience',
  //   title: 'Future experience',
  //   description: 'Coming soon — internships, collaborations, and real-world work.',
  //   icon: Hourglass,
  //   state: 'upcoming',
  //   points: [],
  // },
]

export default function Experience() {
  // Which milestone ids are currently expanded. Several can be open at once.
  const [openIds, setOpenIds] = useState(() => new Set())

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="view view-experience">
      <PageHeader
        title="Experience"
      />

      <ol className="timeline">
        {milestones.map(({ id, year, title, description, icon: Icon, state, points }) => {
          const hasPoints = points && points.length > 0
          const isOpen = openIds.has(id)
          const pointsId = `timeline-points-${id}`

          return (
            <li className={`timeline-item timeline-item-${state}`} key={id}>
              <div className="timeline-marker">
                <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
              </div>

              <div className="timeline-content">
                {hasPoints ? (
                  <button
                    type="button"
                    className="timeline-header"
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                    aria-controls={pointsId}
                  >
                    <span className="timeline-header-text">
                      {year && <span className="timeline-year">{year}</span>}
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </span>
                    <ChevronDown
                      size={16}
                      strokeWidth={1.75}
                      className="timeline-chevron"
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <div className="timeline-header timeline-header-static">
                    <span className="timeline-header-text">
                      {year && <span className="timeline-year">{year}</span>}
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </span>
                  </div>
                )}

                <AnimatePresence initial={false}>
                  {hasPoints && isOpen && (
                    <motion.ul
                      id={pointsId}
                      className="timeline-points"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
