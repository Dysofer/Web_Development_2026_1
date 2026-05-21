import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [section, setSection] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const p = maxScroll > 0 ? scrollTop / maxScroll : 0
      setProgress(p)

      // Determine section (0-4)
      const vh = window.innerHeight
      setSection(Math.floor(scrollTop / vh))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { progress, section }
}
