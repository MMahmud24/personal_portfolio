import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import useStore from '../../store/useStore'
import './Terminal.css'

const COMMANDS = {
  whoami: () => ['Mahin Mahmud', 'Software Engineer & CS Student @ Binghamton University', 'GPA: 3.90 | New York, NY', '[confidence: 0.97]'],
  'ls projects': () => [
    'drwxr-xr-x  clipbook/               2026-03-01',
    'drwxr-xr-x  brain-invaders/         2025-11-01',
    'drwxr-xr-x  tlc-fare-predictor/     2025-08-01',
    'drwxr-xr-x  notes-university/       2025-02-01',
  ],
  'cat resume.pdf': () => {
    window.open('/mahin-mahmud-resume.pdf', '_blank')
    return ['Opening resume.pdf...', '[done]']
  },
  'ping contact': () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    return ['PING contact... pong! Scrolling to contact section.']
  },
  'curl /skills': () => [
    '{',
    '  "machine_learning": 0.82,',
    '  "backend_dev": 0.88,',
    '  "frontend_dev": 0.85,',
    '  "data_engineering": 0.78,',
    '  "cloud_infra": 0.72,',
    '  "ai_automation": 0.76',
    '}',
  ],
  'sudo hire-me': (setLines) => {
    setLines(prev => [...prev, { type: 'output', text: '[sudo] password for visitor: ' }])
    setTimeout(() => {
      setLines(prev => [...prev,
        { type: 'output', text: '...' },
        { type: 'success', text: 'Access granted. Let\'s talk — mahin2406@gmail.com' },
      ])
    }, 1200)
    return null
  },
  help: () => [
    'Available commands:',
    '  whoami          — Who is Mahin?',
    '  ls projects     — List all projects',
    '  cat resume.pdf  — Download resume',
    '  ping contact    — Scroll to contact',
    '  curl /skills    — Skills as JSON',
    '  sudo hire-me    — ...',
    '  clear           — Clear terminal',
    '  exit            — Close terminal',
  ],
  clear: null,
  exit: null,
}

export default function Terminal() {
  const { terminalOpen, setTerminalOpen } = useStore()
  const [input, setInput] = useState('')
  const [lines, setLines] = useState([{ type: 'info', text: 'Neural Interface Terminal v1.0 — type "help" for commands' }])
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [terminalOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const runCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    setLines(prev => [...prev, { type: 'input', text: `> ${cmd}` }])

    if (trimmed === 'clear') { setLines([]); return }
    if (trimmed === 'exit')  { setTerminalOpen(false); return }

    const handler = COMMANDS[trimmed]
    if (!handler) {
      setLines(prev => [...prev, { type: 'error', text: `command not found: ${trimmed}. Type "help".` }])
      return
    }
    const result = handler(setLines)
    if (result) {
      setLines(prev => [...prev, ...result.map(t => ({ type: 'output', text: t }))])
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    }
    if (e.key === 'Escape') setTerminalOpen(false)
  }

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          className="terminal-overlay"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="terminal-header">
            <span className="terminal-title">
              <span className="t-dot red" />
              <span className="t-dot yellow" />
              <span className="t-dot green" />
              neural-interface ~ bash
            </span>
            <button className="terminal-close" onClick={() => setTerminalOpen(false)}>
              <X size={14} />
            </button>
          </div>
          <div className="terminal-body">
            {lines.map((line, i) => (
              <div key={i} className={`t-line t-${line.type}`}>{line.text}</div>
            ))}
            <div className="t-input-row">
              <span className="t-prompt">visitor@portfolio:~$</span>
              <input
                ref={inputRef}
                className="t-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                spellCheck={false}
                autoComplete="off"
              />
              <span className="t-caret" />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
