import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import educationData from '../../data/education.json'
import './Education.css'

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Education() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="education-section">
      <div className="section-wrap" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p variants={fadeUp} className="section-label">05 / PRETRAINING DATA</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Education <span>Corpus</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="edu-subtitle">
            The dataset that shaped the foundation model.
          </motion.p>

          {educationData.map((edu) => (
            <motion.div key={edu.id} variants={fadeUp} className="dataset-card">
              <div className="dataset-left">
                <div className="dataset-institution">
                  <span className="inst-abbr">BU</span>
                </div>
                <pre className="dataset-json">{JSON.stringify({
                  source:        edu.source,
                  domain:        edu.domain,
                  location:      edu.location,
                  size:          edu.size,
                  quality_score: edu.quality_score,
                  topics:        edu.topics,
                  license:       edu.license,
                }, null, 2)}</pre>
              </div>

              <div className="dataset-right">
                <div className="dataset-right-header">
                  <h3 className="dataset-name">{edu.source}</h3>
                  <span className="dataset-degree">{edu.license}</span>
                </div>
                <div className="dataset-gpa">
                  <span className="gpa-label">GPA</span>
                  <span className="gpa-value">{edu.quality_score} / 4.00</span>
                  <div className="gpa-bar-wrap">
                    <motion.div
                      className="gpa-bar-fill"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(edu.quality_score / 4) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <div className="corpus-summary">
                  <span className="corpus-label">CORPUS SUMMARY</span>
                  <ul className="corpus-list">
                    {edu.corpus_summary.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="dataset-topics">
                  {edu.topics.map(t => (
                    <span key={t} className="tag cyan">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
