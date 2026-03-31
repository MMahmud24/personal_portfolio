import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, Award } from 'lucide-react'
import { GithubIcon } from '../global/SocialIcons'
import projectsData from '../../data/projects.json'
import './Projects.css'

const TAG_COLORS = { 'AI/ML': 'cyan', 'ML': 'cyan', 'Machine Learning': 'cyan',
  'Full-Stack': 'green', 'Backend': 'green', 'Frontend': 'amber', 'React': 'amber',
  'Data Engineering': 'green', 'Python': 'cyan', 'TypeScript': 'cyan' }

const TASK_TYPES   = ['All', 'NLP', 'Full-Stack']
const FRAMEWORKS   = ['All', 'Scikit-learn', 'Other']

function ModelCard({ project, onOpen }) {
  return (
    <motion.div
      layout
      className={`model-card ${project.featured ? 'featured' : ''}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      onClick={() => onOpen(project)}
    >
      <div className="mc-header">
        <span className="mc-id">{project.slug}</span>
        {project.award && (
          <span className="mc-award">
            <Award size={10} />
            {project.award}
          </span>
        )}
      </div>

      <h3 className="mc-title">{project.title}</h3>

      <div className="mc-meta">
        <div className="mc-row"><span className="mc-field">Architecture</span><span className="mc-value">{project.architecture}</span></div>
        <div className="mc-row"><span className="mc-field">Task</span><span className="mc-value">{project.task}</span></div>
        <div className="mc-row"><span className="mc-field">Dataset</span><span className="mc-value">{project.dataset}</span></div>
        <div className="mc-row">
          <span className="mc-field">Performance</span>
          <span className="mc-value mc-perf">{project.performance}</span>
        </div>
      </div>

      <p className="mc-description">{project.description}</p>

      <div className="mc-footer">
        <div className="mc-tags">
          {project.tags.map(t => (
            <span key={t} className={`tag ${TAG_COLORS[t] || ''}`}>{t}</span>
          ))}
        </div>
        <div className="mc-links">
          <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} aria-label="GitHub">
            <GithubIcon size={14} />
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} aria-label="Live demo">
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <div className="modal-header">
          <div>
            <span className="mc-id">{project.slug}</span>
            <h2 className="modal-title">{project.title}</h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {project.award && (
          <div className="modal-award">
            <Award size={12} /> {project.award}
          </div>
        )}

        <div className="modal-grid">
          <div className="modal-meta">
            {[
              ['Architecture', project.architecture],
              ['Task', project.task],
              ['Dataset', project.dataset],
              ['Performance', project.performance],
              ['Year', project.year],
            ].map(([k, v]) => (
              <div key={k} className="mc-row">
                <span className="mc-field">{k}</span>
                <span className="mc-value">{v}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="modal-desc">{project.description}</p>
            <div className="mc-tags" style={{ marginTop: 16 }}>
              {project.tags.map(t => (
                <span key={t} className={`tag ${TAG_COLORS[t] || ''}`}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
              <a className="btn btn-primary" href={project.github} target="_blank" rel="noreferrer">
                <GithubIcon size={14} /> View on GitHub
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [taskFilter, setTaskFilter]   = useState('All')
  const [fwFilter,   setFwFilter]     = useState('All')
  const [modal, setModal]             = useState(null)

  const filtered = projectsData.filter(p => {
    const taskOk = taskFilter === 'All' || p.taskType === taskFilter
    const fwOk   = fwFilter === 'All'   || p.framework === fwFilter
    return taskOk && fwOk
  })

  return (
    <section id="projects" className="projects-section">
      <div className="section-wrap" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">04 / MODEL ZOO</p>
          <h2 className="section-title">
            Deployed <span>Experiments</span>
          </h2>

          {/* Filter bar */}
          <div className="filter-bar">
            <div className="filter-group">
              <span className="filter-label">task_type:</span>
              {TASK_TYPES.map(t => (
                <button
                  key={t}
                  className={`filter-btn ${taskFilter === t ? 'active' : ''}`}
                  onClick={() => setTaskFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="filter-group">
              <span className="filter-label">framework:</span>
              {FRAMEWORKS.map(f => (
                <button
                  key={f}
                  className={`filter-btn ${fwFilter === f ? 'active' : ''}`}
                  onClick={() => setFwFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Cards grid */}
          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map(p => (
                <ModelCard key={p.id} project={p} onOpen={setModal} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </section>
  )
}
