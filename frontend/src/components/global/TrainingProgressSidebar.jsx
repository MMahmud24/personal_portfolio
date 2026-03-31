import { useEffect, useState } from 'react'
import './TrainingProgressSidebar.css'

const MILESTONES = [
  { pct: 0,   label: 'INIT' },
  { pct: 15,  label: 'ABOUT' },
  { pct: 35,  label: 'EXPERIENCE' },
  { pct: 55,  label: 'PROJECTS' },
  { pct: 72,  label: 'EDUCATION' },
  { pct: 88,  label: 'CONTACT' },
  { pct: 98,  label: '100% LOADED' },
]

export default function TrainingProgressSidebar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside className="training-sidebar" aria-label="Training progress">
      <span className="sidebar-label top">Training</span>
      <div className="sidebar-track">
        <div className="sidebar-fill" style={{ height: `${progress}%` }} />
        <div className="sidebar-glow" style={{ top: `${progress}%` }} />
        {MILESTONES.map((m) => (
          <div
            key={m.pct}
            className={`sidebar-milestone ${progress >= m.pct ? 'reached' : ''}`}
            style={{ top: `${m.pct}%` }}
          >
            <span className="milestone-dot" />
            <span className="milestone-label">{m.label}</span>
          </div>
        ))}
      </div>
      <span className="sidebar-label bottom">{Math.round(progress)}%</span>
    </aside>
  )
}
