import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export default function LossCurve({ data, onNodeClick, activeId }) {
  const svgRef  = useRef(null)
  const wrapRef = useRef(null)
  const [drawn, setDrawn] = useState(false)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setDrawn(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!drawn || !svgRef.current) return

    const W = svgRef.current.clientWidth || 700
    const H = 220
    const margin = { top: 20, right: 30, bottom: 40, left: 50 }
    const iw = W - margin.left - margin.right
    const ih = H - margin.top - margin.bottom

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.attr('viewBox', `0 0 ${W} ${H}`)

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    // Scales
    const years = data.map(d => d.year)
    const xDomain = [Math.min(...years) - 0.3, Math.max(...years) + 0.3]
    const xScale = d3.scaleLinear().domain(xDomain).range([0, iw])
    const yScale = d3.scaleLinear().domain([0, 100]).range([ih, 0])

    // Background grid
    g.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(yScale).tickSize(-iw).tickFormat(''))
      .selectAll('line')
      .attr('stroke', 'rgba(0,212,255,0.05)')

    g.select('.grid .domain').remove()

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${ih})`)
      .call(d3.axisBottom(xScale).ticks(4).tickFormat(d => `'${String(Math.round(d)).slice(2)}`))
      .selectAll('text, line, path')
      .attr('fill', '#4A5580')
      .attr('stroke', '#4A5580')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-size', '10px')

    g.append('g')
      .call(d3.axisLeft(yScale).ticks(4).tickFormat(d => `${d}%`))
      .selectAll('text, line, path')
      .attr('fill', '#4A5580')
      .attr('stroke', '#4A5580')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-size', '10px')

    // Axis labels
    g.append('text')
      .attr('x', iw / 2).attr('y', ih + 34)
      .attr('text-anchor', 'middle')
      .attr('fill', '#4A5580')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .text('Year')

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(ih / 2)).attr('y', -38)
      .attr('text-anchor', 'middle')
      .attr('fill', '#4A5580')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .text('Expertise')

    // Area fill
    const area = d3.area()
      .x(d => xScale(d.year))
      .y0(ih)
      .y1(d => yScale(d.expertiseScore))
      .curve(d3.curveCatmullRom)

    g.append('path')
      .datum(data)
      .attr('d', area)
      .attr('fill', 'rgba(0,212,255,0.05)')

    // Line
    const lineGen = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.expertiseScore))
      .curve(d3.curveCatmullRom)

    const path = g.append('path')
      .datum(data)
      .attr('d', lineGen)
      .attr('fill', 'none')
      .attr('stroke', 'var(--accent-cyan, #00D4FF)')
      .attr('stroke-width', 2)

    const len = path.node().getTotalLength()
    path
      .attr('stroke-dasharray', `${len} ${len}`)
      .attr('stroke-dashoffset', len)
      .transition().duration(1200).ease(d3.easeCubicInOut)
      .attr('stroke-dashoffset', 0)

    // Nodes
    data.forEach(d => {
      const isActive = d.id === activeId
      const cx = xScale(d.year)
      const cy = yScale(d.expertiseScore)

      const circle = g.append('circle')
        .attr('cx', cx).attr('cy', cy)
        .attr('r', 0)
        .attr('fill', isActive ? 'var(--accent-green)' : 'var(--accent-cyan)')
        .attr('stroke', 'var(--bg-primary)')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')

      circle.transition().delay(1000).duration(200).attr('r', 6)

      circle
        .on('mouseenter', (event) => {
          setTooltip({ d, x: event.pageX, y: event.pageY })
          circle.attr('r', 9)
        })
        .on('mouseleave', () => {
          setTooltip(null)
          circle.attr('r', 6)
        })
        .on('click', () => onNodeClick && onNodeClick(d.id))

      // Label
      g.append('text')
        .attr('x', cx).attr('y', cy - 14)
        .attr('text-anchor', 'middle')
        .attr('fill', '#8B9CC8')
        .attr('font-size', '9px')
        .attr('font-family', 'JetBrains Mono, monospace')
        .text(`Epoch ${d.epoch}`)
        .attr('opacity', 0)
        .transition().delay(1100)
        .attr('opacity', 1)
    })
  }, [drawn, data, activeId])

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        style={{ width: '100%', height: 220, display: 'block' }}
        aria-label="Career training loss curve"
      />
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
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: 'var(--accent-cyan)' }}>{tooltip.d.company}</strong>
          <br />
          <span style={{ color: 'var(--text-secondary)' }}>{tooltip.d.role}</span>
          <br />
          <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>{tooltip.d.start} — {tooltip.d.end}</span>
        </div>
      )}
    </div>
  )
}
