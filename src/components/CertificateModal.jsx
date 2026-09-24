import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'

export default function CertificateModal({ certificate, onClose }) {
  const dialogRef = useRef(null)
  const closeBtnRef = useRef(null)
  const lastFocusedRef = useRef(null)

  useEffect(() => {
    if (!certificate) return

    lastFocusedRef.current = document.activeElement
    closeBtnRef.current?.focus()

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

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
  }, [certificate, onClose])

  return createPortal(
    <AnimatePresence>
      {certificate && (
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
            aria-labelledby="certificate-modal-title"
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
              aria-label="Close certificate details"
            >
              <X size={18} strokeWidth={1.75} />
            </button>

            {certificate.image && (
              <div className="modal-media modal-media-contain">
                <img src={certificate.image} alt={`${certificate.title} certificate`} />
              </div>
            )}

            <div className="modal-body">
              <div className="modal-meta">
                {certificate.issuer && (
                  <span className="modal-category">{certificate.issuer}</span>
                )}
                {certificate.date && <span className="modal-chip">{certificate.date}</span>}
              </div>

              <h2 id="certificate-modal-title" className="modal-title">
                {certificate.title}
              </h2>

              {certificate.credentialUrl && (
                <div className="modal-actions">
                  <a
                    className="btn btn-primary"
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={15} strokeWidth={1.75} aria-hidden="true" />
                    View credential
                  </a>
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
