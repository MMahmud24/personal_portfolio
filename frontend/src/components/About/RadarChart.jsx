import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const W = 340, H = 340, CX = W / 2, CY = H / 2, R = 130

export default function RadarChart({ data }) {
  const svgRef  = useRef(null)
  const wrapRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)
  const [drawn, setDrawn]     = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setDrawn(true) }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!drawn || !svgRef.current) return
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const n    = data.length
    const step = (Math.PI * 2) / n

    const angle = (i) => step * i - Math.PI / 2
    const coord = (val, i) => ({
      x: CX + Math.cos(angle(i)) * val * R,
      y: CY + Math.sin(angle(i)) * val * R,
    })

    const line = d3.line().x(d => d.x).y(d => d.y).curve(d3.curveLinearClosed)

    // Grid rings
    ;[0.25, 0.5, 0.75, 1.0].forEach(t => {
      const pts = data.map((_, i) => coord(t, i))
      svg.append('path')
        .datum(pts)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(0,212,255,0.08)')
        .attr('stroke-width', 1)
    })

    // Axes
    data.forEach((_, i) => {
      const c = coord(1, i)
      svg.append('line')
        .attr('x1', CX).attr('y1', CY)
        .attr('x2', c.x).attr('y2', c.y)
        .attr('stroke', 'rgba(0,212,255,0.1)')
        .attr('stroke-width', 1)
    })

    // Axis labels
    data.forEach((d, i) => {
      const c = coord(1.22, i)
      svg.append('text')
        .attr('x', c.x).attr('y', c.y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#8B9CC8')
        .attr('font-size', '10px')
        .attr('font-family', 'JetBrains Mono, monospace')
        .attr('font-weight', '500')
        .text(d.axis)
    })

    // Target polygon (dashed green)
    const tPts = data.map((d, i) => coord(d.target, i))
    svg.append('path')
      .datum(tPts)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(0,255,157,0.3)')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4 3')

    // Current polygon (cyan fill) — animate in
    const cPts = data.map((d, i) => coord(d.current, i))
    const path = svg.append('path')
      .datum(cPts)
      .attr('d', line)
      .attr('fill', 'rgba(0,212,255,0.12)')
      .attr('stroke', 'var(--accent-cyan, #00D4FF)')
      .attr('stroke-width', 2)

    // Animate stroke-dasharray to simulate draw-in
    const totalLength = path.node().getTotalLength()
    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition().duration(900).ease(d3.easeCubicInOut)
      .attr('stroke-dashoffset', 0)

    // Dots on current polygon
    data.forEach((d, i) => {
      const c = coord(d.current, i)
      const dot = svg.append('circle')
        .attr('cx', c.x).attr('cy', c.y)
        .attr('r', 0)
        .attr('fill', 'var(--accent-cyan, #00D4FF)')
        .attr('stroke', 'var(--bg-primary, #0A0F1E)')
        .attr('stroke-width', 2)
        .style('cursor', 'crosshair')

      dot.transition().delay(900).duration(200)
        .attr('r', 4)

      dot.on('mouseenter', (event) => {
          setTooltip({ text: d.axis, score: Math.round(d.current * 100), desc: d.descriptor, x: event.pageX, y: event.pageY })
          dot.attr('r', 6).attr('fill', '#00FF9D')
        })
        .on('mouseleave', () => {
          setTooltip(null)
          dot.attr('r', 4).attr('fill', 'var(--accent-cyan, #00D4FF)')
        })
    })
  }, [drawn, data])

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'inline-block' }}>
      <svg ref={svgRef} width={W} height={H} aria-label="Skills radar chart" />
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            top: tooltip.y + 12,
            left: tooltip.x + 12,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 6,
            padding: '8px 12px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: 'var(--text-primary)',
            pointerEvents: 'none',
            zIndex: 2000,
            maxWidth: 220,
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: 'var(--accent-cyan)' }}>{tooltip.text}</strong>
          <br />
          <span style={{ color: 'var(--accent-green)' }}>{tooltip.score}%</span>
          <br />
          <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>{tooltip.desc}</span>
        </div>
      )}
    </div>
  )
}
