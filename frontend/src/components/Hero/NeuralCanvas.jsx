import { useEffect, useRef } from 'react'

const NODE_COUNT = 90
const EDGE_DIST  = 130
const COLORS = { node: '#00D4FF', edge: '#00D4FF', pulse: '#00FF9D' }

export default function NeuralCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let mouse = { x: -1000, y: -1000 }
    let pulses = []
    let nodes = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', () => { mouse = { x: -1000, y: -1000 } })

    // Init nodes
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:   Math.random() * 2 + 1.5,
    }))

    // Schedule random edge pulses
    const schedulePulse = () => {
      const i = Math.floor(Math.random() * NODE_COUNT)
      const j = Math.floor(Math.random() * NODE_COUNT)
      if (i !== j) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        if (Math.hypot(dx, dy) < EDGE_DIST) {
          pulses.push({ i, j, progress: 0, speed: 0.025 + Math.random() * 0.02 })
        }
      }
      setTimeout(schedulePulse, 400 + Math.random() * 1600)
    }
    schedulePulse()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach(n => {
        // Mouse repulsion
        const dx = n.x - mouse.x
        const dy = n.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 80) {
          n.vx += (dx / dist) * 0.5
          n.vy += (dy / dist) * 0.5
        }

        n.vx *= 0.99; n.vy *= 0.99
        n.x  += n.vx; n.y  += n.vy

        // Bounce at edges
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
        n.x = Math.max(0, Math.min(canvas.width,  n.x))
        n.y = Math.max(0, Math.min(canvas.height, n.y))

        // Draw edges to nearby nodes
        nodes.forEach(m => {
          const ex = n.x - m.x
          const ey = n.y - m.y
          const ed = Math.hypot(ex, ey)
          if (ed < EDGE_DIST && ed > 0) {
            const alpha = (1 - ed / EDGE_DIST) * 0.15
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })

        // Draw node
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,0.6)`
        ctx.fill()
      })

      // Animate pulses
      pulses = pulses.filter(p => {
        p.progress += p.speed
        if (p.progress >= 1) return false
        const ni = nodes[p.i], nj = nodes[p.j]
        const px = ni.x + (nj.x - ni.x) * p.progress
        const py = ni.y + (nj.y - ni.y) * p.progress
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,157,${1 - p.progress})`
        ctx.fill()
        ctx.shadowBlur = 10
        ctx.shadowColor = COLORS.pulse
        ctx.fill()
        ctx.shadowBlur = 0
        return true
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    />
  )
}
