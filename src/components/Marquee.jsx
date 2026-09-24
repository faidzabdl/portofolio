import { useEffect, useRef, useState } from 'react'

/**
 * Auto-scrolling horizontal carousel.
 *
 * If the content is wide enough to overflow its container, it's rendered
 * three times back-to-back (copy 2 is identical to copy 1, so the loop can
 * wrap seamlessly) and auto-advances via rAF. Trackpad/touch scroll and
 * mouse drag all work because this is a real scrollable element, not a
 * transform animation -- the rAF loop just nudges `scrollLeft`.
 *
 * If the content already fits (e.g. only one or two cards), none of that
 * kicks in: it renders once, statically, with no scrolling, no dragging,
 * and no wasted duplicate cards sitting side by side.
 */
export default function Marquee({ children, speed = 36, ariaLabel }) {
  const trackRef = useRef(null)
  const measureRef = useRef(null)
  const rafRef = useRef(null)
  const pausedRef = useRef(false)
  const pointerDownRef = useRef(false)
  const draggingRef = useRef(false)
  const movedRef = useRef(false)
  const suppressClickRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartScrollRef = useRef(0)
  const singleWidthRef = useRef(0)
  const lastTsRef = useRef(null)
  const resumeTimeoutRef = useRef(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  // Whether there's actually enough content to need scrolling at all.
  const [loop, setLoop] = useState(false)

  // How many pixels the pointer has to move before a press counts as a
  // drag instead of a click. Below this, releasing the pointer lets the
  // click through normally (e.g. to open the certificate modal).
  const DRAG_THRESHOLD = 6

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(query.matches)
    const handleChange = (event) => setReduceMotion(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  // Measure one copy of the content against the visible container. Only
  // switch into "loop mode" (tripled content + auto-scroll) if the content
  // is actually wider than the space it has to sit in.
  useEffect(() => {
    const track = trackRef.current
    const measure = measureRef.current
    if (!track || !measure) return

    const checkOverflow = () => {
      const contentWidth = measure.scrollWidth
      singleWidthRef.current = contentWidth
      setLoop(contentWidth > track.clientWidth + 1)
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track || !loop) return

    track.scrollLeft = singleWidthRef.current

    const step = (timestamp) => {
      if (lastTsRef.current == null) lastTsRef.current = timestamp
      const deltaSeconds = (timestamp - lastTsRef.current) / 1000
      lastTsRef.current = timestamp

      const single = singleWidthRef.current
      if (single > 0) {
        if (!pausedRef.current && !draggingRef.current && !reduceMotion) {
          track.scrollLeft += speed * deltaSeconds
        }

        if (track.scrollLeft >= single * 2) {
          track.scrollLeft -= single
        } else if (track.scrollLeft < 0) {
          track.scrollLeft += single
        }
      }

      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTsRef.current = null
    }
  }, [loop, speed, reduceMotion])

  useEffect(
    () => () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    },
    [],
  )

  const pauseTemporarily = (delay) => {
    pausedRef.current = true
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false
    }, delay)
  }

  const handlePointerDown = (event) => {
    if (!loop || event.pointerType === 'touch') return
    const track = trackRef.current
    if (!track) return
    // Pause auto-scroll immediately -- whether this turns into a click or
    // a drag, we don't want the marquee crawling under the user's finger.
    pausedRef.current = true
    pointerDownRef.current = true
    movedRef.current = false
    dragStartXRef.current = event.clientX
    dragStartScrollRef.current = track.scrollLeft
  }

  const handlePointerMove = (event) => {
    if (!pointerDownRef.current) return
    const track = trackRef.current
    if (!track) return

    const dx = event.clientX - dragStartXRef.current

    if (!movedRef.current) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return
      // Movement just crossed the threshold -- this is a real drag now,
      // not a click. Capture the pointer so it keeps tracking even if the
      // cursor leaves the marquee while dragging.
      movedRef.current = true
      draggingRef.current = true
      setIsDragging(true)
      try {
        track.setPointerCapture(event.pointerId)
      } catch {
        // Ignore -- capture is a nice-to-have, dragging still works without it.
      }
    }

    track.scrollLeft = dragStartScrollRef.current - dx
  }

  const endDrag = (event) => {
    if (!pointerDownRef.current) return
    pointerDownRef.current = false

    if (movedRef.current) {
      // A real drag just happened -- the browser will still fire a click
      // right after this, so swallow that one click and let normal clicks
      // (no drag) through untouched.
      suppressClickRef.current = true
    }

    draggingRef.current = false
    movedRef.current = false
    setIsDragging(false)
    try {
      trackRef.current?.releasePointerCapture(event.pointerId)
    } catch {
      // Pointer capture may already have been released -- safe to ignore.
    }
  }

  const handleClickCapture = (event) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const copies = loop ? [0, 1, 2] : [0]

  return (
    <div
      ref={trackRef}
      className={`marquee${loop ? '' : ' marquee-static'}${isDragging ? ' is-dragging' : ''}`}
      role="region"
      aria-label={ariaLabel}
      tabIndex={loop ? 0 : -1}
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
      onWheel={loop ? () => pauseTemporarily(700) : undefined}
      onTouchStart={loop ? () => { pausedRef.current = true } : undefined}
      onTouchEnd={loop ? () => pauseTemporarily(400) : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={handleClickCapture}
    >
      {copies.map((copyIndex) => (
        <div
          className="marquee-copy"
          key={copyIndex}
          ref={copyIndex === 0 ? measureRef : undefined}
          aria-hidden={copyIndex !== 0}
          {...(copyIndex !== 0 ? { inert: '' } : {})}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
