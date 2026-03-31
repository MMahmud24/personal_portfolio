import { useState, useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowDown, ChevronRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../global/SocialIcons'
import { useTypewriter } from '../../hooks/useTypewriter'
import './Hero.css'

const NeuralCanvas = lazy(() => import('./NeuralCanvas'))

const TECH_STACK = [
  'Python', 'React', 'Node.js', 'TypeScript', 'Flask', 'Scikit-learn',
  'pandas', 'MongoDB', 'AWS', 'Docker', 'GraphQL', 'TailwindCSS',
]

const PROMPT_TEXT  = '> describe mahin-mahmud --format=brief'
const NAME_TEXT    = 'Mahin Mahmud'
const TITLE_TEXT   = 'Software Engineer & CS Student'

function Prompt() {
  const { displayedText: prompt, isComplete: promptDone } = useTypewriter(PROMPT_TEXT, 38, 400)
  const { displayedText: name,   isComplete: nameDone }   = useTypewriter(NAME_TEXT,   45, promptDone ? 800 : 99999)
  const { displayedText: title }                           = useTypewriter(TITLE_TEXT,  35, nameDone   ? 200 : 99999)

  return (
    <div className="hero-prompt">
      <div className="prompt-line">
        <span className="prompt-text">{prompt}</span>
        {!promptDone && <span className="cursor-blink" />}
      </div>
      {promptDone && (
        <div className="prompt-output">
          <div className="prompt-name-line">
            <span className="prompt-name">{name}</span>
            {nameDone && <span className="confidence-badge">[confidence: 0.97]</span>}
            {!nameDone && <span className="cursor-blink" />}
          </div>
          {nameDone && (
            <div className="prompt-title-line">
              <ChevronRight size={12} className="prompt-arrow" />
              <span className="prompt-title-text">{title}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 640px)').matches)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner">
        {/* Left column */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="badge-dot" />
            Available for opportunities
          </motion.div>

          <Prompt />

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            Computer Science student at Binghamton University building full-stack systems and ML pipelines with real-world impact.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
          >
            <a
              className="btn btn-primary hero-cta-primary"
              href="#projects"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              View Projects
              <ChevronRight size={14} />
            </a>
            <a
              className="btn btn-ghost"
              href="/mahin-mahmud-resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
          >
            <a href="https://github.com/MMahmud24" target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={16} />
            </a>
            <a href="https://linkedin.com/in/mahin-mahmud24" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={16} />
            </a>
            <a href="mailto:mahin2406@gmail.com" aria-label="Email">
              <Mail size={16} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — canvas */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          {!isMobile ? (
            <Suspense fallback={<div className="canvas-placeholder" />}>
              <NeuralCanvas />
            </Suspense>
          ) : (
            <div className="canvas-static-mobile" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="static-node" style={{ '--i': i }} />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Marquee */}
      <motion.div
        className="hero-marquee"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <div className="marquee-track">
          {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
            <span key={i} className="marquee-item">{t}</span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down"
      >
        <ArrowDown size={14} />
        <span>scroll</span>
      </motion.button>
    </section>
  )
}
