import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import RadarChart from './RadarChart'
import skillsData from '../../data/skills.json'
import './About.css'

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

const COLOR_MAP = { cyan: 'cyan', green: 'green', amber: 'amber' }

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="about-section">
      <div className="section-wrap" ref={ref}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="about-grid"
        >
          {/* Left — bio */}
          <motion.div variants={fadeUp} className="about-left">
            <p className="section-label">02 / FEATURE EXTRACTION</p>
            <h2 className="section-title">About <span>Me</span></h2>

            <p className="about-lead">
              I'm a CS student at Binghamton University (GPA&nbsp;3.90) who builds at the intersection
              of software engineering and machine learning.
            </p>
            <p className="about-bio">
              From event platforms serving 2,000+ users to real-time fare prediction pipelines trained
              on 700K+ records, I care about building things that work at scale. Currently a Software
              Developer at Muslim Interscholastic Tournament and Technology Director at StackHacks —
              where I lead technical strategy and workshops for 150+ participants.
            </p>
            <p className="about-bio">
              I'm looking for SWE internships and research opportunities where I can contribute to
              challenging ML, backend, or full-stack problems.
            </p>

            {/* Model card aside */}
            <div className="about-model-card">
              <span className="model-card-label">MODEL CARD</span>
              <div className="model-card-row"><span>Architecture</span><span>Full-Stack + ML Engineer</span></div>
              <div className="model-card-row"><span>Parameters</span><span>2+ years production experience</span></div>
              <div className="model-card-row"><span>Fine-tuned on</span><span>NLP, Data Engineering, MLOps</span></div>
              <div className="model-card-row"><span>Status</span><span className="status-active">● Active</span></div>
            </div>

            {/* Skill groups */}
            <div className="about-skill-groups">
              {skillsData.groups.map(g => (
                <div key={g.label} className="skill-group">
                  <span className="skill-group-label">{g.label}</span>
                  <div className="skill-tags">
                    {g.skills.map(s => (
                      <span key={s} className={`tag ${COLOR_MAP[g.color] || ''}`}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — radar chart */}
          <motion.div variants={fadeUp} className="about-right">
            <div className="radar-container">
              <div className="radar-legend">
                <span className="legend-item cyan">■ Current level</span>
                <span className="legend-item green">- - Target level</span>
              </div>
              <RadarChart data={skillsData.radar} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
