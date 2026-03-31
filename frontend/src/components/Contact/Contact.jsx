import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../global/SocialIcons'
import { useTypewriter } from '../../hooks/useTypewriter'
import './Contact.css'

const INTENT_OPTIONS = ['collaboration', 'job', 'other']
const SUCCESS_RESPONSE = `HTTP/1.1 200 OK
Content-Type: application/json
X-Response-Time: 42ms

{
  "status": "success",
  "message": "Request received. I will get back to you within 24 hours.",
  "job_id": "msg_${Math.random().toString(36).slice(2, 10)}"
}`

function SuccessPanel() {
  const { displayedText } = useTypewriter(SUCCESS_RESPONSE, 18, 100)
  return (
    <div className="response-panel success">
      <pre className="response-text">{displayedText}</pre>
    </div>
  )
}

const STATUS_ITEMS = [
  { label: 'Open to Work', value: 'Active', color: 'green' },
  { label: 'Response Time', value: '~24h', color: 'cyan' },
  { label: 'Location', value: 'New York, NY', color: 'cyan' },
  { label: 'Preferred Contact', value: 'Email', color: 'cyan' },
]

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({
    from_name: '', email: '', subject: '', intent: 'collaboration', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate a short delay (replace with actual EmailJS call if desired)
    await new Promise(r => setTimeout(r, 1400))
    setStatus('success')
  }

  const fadeUp = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p variants={fadeUp} className="section-label">06 / API ENDPOINT</motion.p>
          <motion.h2 variants={fadeUp} className="section-title contact-title">
            POST <span>/contact</span> HTTP/1.1
          </motion.h2>
          <motion.p variants={fadeUp} className="contact-subtitle">
            Host: mahinmahmud.dev — Status: <span className="status-online">● 200 OK</span>
          </motion.p>

          <div className="contact-grid">
            {/* Form / Response */}
            <motion.div variants={fadeUp}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <SuccessPanel />
                    <button
                      className="btn btn-ghost"
                      style={{ marginTop: 16 }}
                      onClick={() => { setStatus('idle'); setForm({ from_name:'',email:'',subject:'',intent:'collaboration',message:'' }) }}
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="api-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="api-form-header">
                      <span className="api-method">POST</span>
                      <span className="api-path">/contact</span>
                      <span className="api-version">HTTP/1.1</span>
                    </div>
                    <div className="api-headers">
                      <span>Host: mahinmahmud.dev</span>
                      <span>Content-Type: application/json</span>
                    </div>

                    <div className="api-body">
                      <span className="api-brace">{'{'}</span>

                      <div className="api-field-row">
                        <span className="api-key">"from_name"</span>
                        <span className="api-colon">:</span>
                        <input
                          className="api-input"
                          type="text"
                          placeholder="your name"
                          value={form.from_name}
                          onChange={set('from_name')}
                          required
                        />
                      </div>

                      <div className="api-field-row">
                        <span className="api-key">"email"</span>
                        <span className="api-colon">:</span>
                        <input
                          className="api-input"
                          type="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={set('email')}
                          required
                        />
                      </div>

                      <div className="api-field-row">
                        <span className="api-key">"subject"</span>
                        <span className="api-colon">:</span>
                        <input
                          className="api-input"
                          type="text"
                          placeholder="what is this about?"
                          value={form.subject}
                          onChange={set('subject')}
                          required
                        />
                      </div>

                      <div className="api-field-row">
                        <span className="api-key">"intent"</span>
                        <span className="api-colon">:</span>
                        <div className="intent-toggle">
                          {INTENT_OPTIONS.map(opt => (
                            <button
                              key={opt}
                              type="button"
                              className={`intent-btn ${form.intent === opt ? 'active' : ''}`}
                              onClick={() => setForm(f => ({ ...f, intent: opt }))}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="api-field-row align-start">
                        <span className="api-key">"message"</span>
                        <span className="api-colon">:</span>
                        <textarea
                          className="api-input api-textarea"
                          placeholder="your message..."
                          value={form.message}
                          onChange={set('message')}
                          required
                          rows={4}
                        />
                      </div>

                      <span className="api-brace">{'}'}</span>
                    </div>

                    <button
                      className={`btn btn-primary submit-btn ${status === 'sending' ? 'sending' : ''}`}
                      type="submit"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <><span className="sending-bar">Sending... [====&gt;  ]</span></>
                      ) : (
                        <><Send size={13} /> Send Request →</>
                      )}
                    </button>

                    {status === 'error' && (
                      <div className="response-panel error">
                        <AlertCircle size={14} />
                        HTTP/1.1 503 Service Unavailable — Please email me directly at mahin2406@gmail.com
                      </div>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Status + socials */}
            <motion.div variants={fadeUp} className="contact-sidebar">
              <div className="status-dashboard">
                <span className="status-dashboard-label">SYSTEM STATUS</span>
                {STATUS_ITEMS.map(s => (
                  <div key={s.label} className="status-row">
                    <span className={`status-dot ${s.color}`} />
                    <span className="status-key">{s.label}</span>
                    <span className={`status-val ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="contact-links">
                <span className="contact-links-label">DIRECT CHANNELS</span>
                <a href="mailto:mahin2406@gmail.com" className="contact-link-row">
                  <Mail size={14} />
                  <span>mahin2406@gmail.com</span>
                </a>
                <a href="https://github.com/MMahmud24" target="_blank" rel="noreferrer" className="contact-link-row">
                  <GithubIcon size={14} />
                  <span>github.com/MMahmud24</span>
                </a>
                <a href="https://linkedin.com/in/mahin-mahmud24" target="_blank" rel="noreferrer" className="contact-link-row">
                  <LinkedinIcon size={14} />
                  <span>linkedin.com/in/mahin-mahmud24</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
