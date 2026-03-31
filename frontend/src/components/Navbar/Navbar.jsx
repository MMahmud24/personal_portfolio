import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal as TermIcon, Menu, X } from 'lucide-react'
import useStore from '../../store/useStore'
import './Navbar.css'

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { toggleTerminal } = useStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { threshold: 0.3 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === '`' || e.key === '/') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault()
        toggleTerminal()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleTerminal])

  const scrollTo = (href) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="nav-inner">
        <a className="nav-logo" href="#hero" onClick={() => scrollTo('#hero')}>
          <span className="logo-bracket">[</span>
          MM
          <span className="logo-bracket">]</span>
        </a>

        <div className="nav-links">
          {LINKS.map(({ label, href }) => (
            <button
              key={label}
              className={`nav-link ${activeSection === href.slice(1) ? 'active' : ''}`}
              onClick={() => scrollTo(href)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button className="nav-terminal-btn" onClick={toggleTerminal} title="Open terminal (`)">
            <TermIcon size={14} />
            <span>terminal</span>
          </button>
          <a
            className="btn btn-primary nav-resume"
            href="/mahin-mahmud-resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            resume.pdf
          </a>
          <button className="nav-mobile-toggle" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          className="nav-mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {LINKS.map(({ label, href }) => (
            <button key={label} className="nav-mobile-link" onClick={() => scrollTo(href)}>
              {label}
            </button>
          ))}
          <a
            className="btn btn-primary"
            href="/mahin-mahmud-resume.pdf"
            target="_blank"
            rel="noreferrer"
            style={{ marginTop: 8 }}
          >
            resume.pdf
          </a>
        </motion.div>
      )}
    </motion.nav>
  )
}
