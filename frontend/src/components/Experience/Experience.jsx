import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import LossCurve from './LossCurve'
import experienceData from '../../data/experience.json'
import './Experience.css'

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Experience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeId, setActiveId] = useState(experienceData[0].id)

  const handleNodeClick = (id) => {
    setActiveId(id)
    document.getElementById(`epoch-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  return (
    <section id="experience" className="experience-section">
      <div className="section-wrap" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p variants={fadeUp} className="section-label">03 / TRAINING HISTORY</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Experience <span>Timeline</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="experience-subtitle">
            Each role is an epoch in the training run. Click a node to expand.
          </motion.p>

          {/* Loss Curve */}
          <motion.div variants={fadeUp} className="loss-curve-wrap">
            <div className="loss-curve-header">
              <span className="loss-curve-label">TRAINING LOSS CURVE</span>
              <span className="loss-curve-meta">x-axis: time · y-axis: expertise</span>
            </div>
            <LossCurve
              data={experienceData}
              onNodeClick={handleNodeClick}
              activeId={activeId}
            />
          </motion.div>

          {/* Epoch Cards */}
          <div className="epoch-cards">
            {experienceData.map((exp, idx) => (
              <motion.div
                key={exp.id}
                id={`epoch-${exp.id}`}
                variants={fadeUp}
                custom={idx}
                className={`epoch-card ${activeId === exp.id ? 'active' : ''}`}
                onClick={() => setActiveId(activeId === exp.id ? null : exp.id)}
              >
                <div className="epoch-card-header">
                  <div className="epoch-card-meta">
                    <span className="epoch-number">Epoch {exp.epoch}</span>
                    <span className="epoch-type">{exp.type}</span>
                  </div>
                  <div className="epoch-card-title">
                    <h3 className="epoch-company">{exp.company}</h3>
                    <div className="epoch-details">
                      <span className="epoch-role">{exp.role}</span>
                      <span className="epoch-period">{exp.start} — {exp.end}</span>
                      <span className="epoch-location">{exp.location}</span>
                    </div>
                  </div>
                  <div className="epoch-card-right">
                    <div className="epoch-metrics">
                      <span>Skills: {exp.skillsAcquired}</span>
                      <span>Shipped: {exp.projectsShipped}</span>
                      <span>Impact: {exp.impact}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`epoch-chevron ${activeId === exp.id ? 'rotated' : ''}`}
                    />
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {activeId === exp.id && (
                    <motion.div
                      className="epoch-card-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <ul className="epoch-bullets">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                      <div className="epoch-tags">
                        {exp.tags.map(t => (
                          <span key={t} className="tag cyan">{t}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
