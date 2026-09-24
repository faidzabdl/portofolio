import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'faidz-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches
  return prefersLight ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#eef0f4' : '#0a0c11')

    const svgIcon = document.getElementById('favicon-svg')
    const pngIcon = document.getElementById('favicon-png')
    if (svgIcon) svgIcon.href = `/favicon-${theme}.svg`
    if (pngIcon) pngIcon.href = `/favicon-${theme}.png`

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // localStorage unavailable (private mode, etc.) — theme still works
      // for this session, it just won't be remembered next visit.
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
