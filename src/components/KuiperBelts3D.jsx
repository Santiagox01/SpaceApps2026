import React, { useEffect, useRef, useState } from 'react'
import { 
  Orbit, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  ArrowLeft,
  Sparkles,
  Info,
  Compass,
  Globe2,
  Sun,
  Shield,
  Layers
} from 'lucide-react'
import { soundEngine } from '../services/soundEngine'

export function KuiperBelts3D({ onBackToDashboard, onSelectCandidate, t }) {
  const canvasRef = useRef(null)

  // Mode: 'planet9_outer' (Órbita A: 500 UA) | 'spherex_earth' (Órbita B: 700 km)
  const [orbitMode, setOrbitMode] = useState('planet9_outer')

  // Camera angles
  const [rotX, setRotX] = useState(55)
  const [rotY, setRotY] = useState(25)
  const [zoom, setZoom] = useState(1.1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [autoRotate, setAutoRotate] = useState(true)

  // Swarm particles for Outer Solar System (Orbit A)
  const swarmRef = useRef([])
  useEffect(() => {
    const particles = []
    for (let i = 0; i < 1100; i++) {
      const radiusAU = 32 + Math.pow(Math.random(), 1.6) * 35
      const angle = Math.random() * Math.PI * 2
      const inclination = (Math.random() - 0.5) * 0.28
      const speed = 0.08 / Math.sqrt(radiusAU)
      const size = Math.random() * 1.5 + 0.5
      const brightness = Math.random() * 0.6 + 0.4
      const color = Math.random() > 0.8 ? '#38bdf8' : (Math.random() > 0.4 ? '#c084fc' : '#94a3b8')

      particles.push({ radiusAU, angle, inclination, speed, size, brightness, color })
    }
    swarmRef.current = particles
  }, [])

  // Mouse interaction
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y

    setRotY(prev => prev + dx * 0.4)
    setRotX(prev => Math.max(10, Math.min(85, prev - dy * 0.4)))
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.12 : 0.12
    setZoom(prev => Math.max(0.4, Math.min(3.5, prev + delta)))
  }

  // Main 3D Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let time = 0

    const render = () => {
      time += 0.015
      if (autoRotate && !isDragging) {
        setRotY(prev => prev + 0.08)
      }

      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2

      ctx.fillStyle = '#020306'
      ctx.fillRect(0, 0, w, h)

      const radX = (rotX * Math.PI) / 180
      const radY = (rotY * Math.PI) / 180
      const cosX = Math.cos(radX)
      const sinX = Math.sin(radX)
      const cosY = Math.cos(radY)
      const sinY = Math.sin(radY)

      if (orbitMode === 'planet9_outer') {
        // ==========================================
        // VISTA A: SISTEMA SOLAR EXTERIOR (500 UA)
        // ==========================================
        const scaleBase = 4.2 * zoom

        const project3D = (xAU, yAU, zAU) => {
          const x1 = xAU * cosY - yAU * sinY
          const y1 = xAU * sinY + yAU * cosY
          const z1 = zAU

          const x2 = x1
          const y2 = y1 * cosX - z1 * sinX
          const z2 = y1 * sinX + z1 * cosX

          const fov = 1000
          const denominator = Math.max(80, fov + z2 * scaleBase * 0.4)
          const depth = Math.max(0.12, Math.min(2.5, fov / denominator))

          return {
            px: cx + x2 * scaleBase * depth,
            py: cy + y2 * scaleBase * depth,
            depth,
            zOrder: z2
          }
        }

        // Draw Sun at center
        const sunP = project3D(0, 0, 0)
        ctx.fillStyle = '#fbbf24'
        ctx.shadowColor = '#fbbf24'
        ctx.shadowBlur = 15
        ctx.beginPath()
        ctx.arc(sunP.px, sunP.py, Math.max(1, 5 * sunP.depth), 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        ctx.fillStyle = '#94a3b8'
        ctx.font = '10px "Space Mono", monospace'
        ctx.fillText('SOL (0 UA)', sunP.px + 10, sunP.py + 4)

        // Draw Neptune Orbit (30 AU)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)'
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let a = 0; a <= Math.PI * 2; a += 0.1) {
          const nx = 30 * Math.cos(a)
          const ny = 30 * Math.sin(a)
          const pt = project3D(nx, ny, 0)
          if (a === 0) ctx.moveTo(pt.px, pt.py)
          else ctx.lineTo(pt.px, pt.py)
        }
        ctx.closePath()
        ctx.stroke()

        // Neptune position
        const nepAngle = time * 0.2
        const nepP = project3D(30 * Math.cos(nepAngle), 30 * Math.sin(nepAngle), 0)
        ctx.fillStyle = '#38bdf8'
        ctx.beginPath()
        ctx.arc(nepP.px, nepP.py, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillText('NEPTUNO (30 UA)', nepP.px + 8, nepP.py + 3)

        // Draw Kuiper Belt Swarm
        const swarm = swarmRef.current
        swarm.forEach(p => {
          p.angle += p.speed * 0.15
          const xAU = p.radiusAU * Math.cos(p.angle)
          const yAU = p.radiusAU * Math.sin(p.angle)
          const zAU = p.radiusAU * Math.sin(p.inclination) * Math.sin(p.angle)

          const pt = project3D(xAU, yAU, zAU)
          ctx.fillStyle = p.color
          ctx.globalAlpha = p.brightness * 0.6
          ctx.beginPath()
          const radius = Math.max(0.2, p.size * pt.depth)
          ctx.arc(pt.px, pt.py, radius, 0, Math.PI * 2)
          ctx.fill()
        })
        ctx.globalAlpha = 1.0

        // Clustered Extreme TNO Orbits (Sedna, 2012 VP113, Leleakuhonua)
        const tnoOrbits = [
          { name: 'SEDNA (q=76 UA, Q=937 UA)', semiMajor: 240, semiMinor: 75, offset: 160, tiltAngle: -0.35, color: '#c084fc' },
          { name: '2012 VP113 (q=80 UA, Q=440 UA)', semiMajor: 180, semiMinor: 60, offset: 120, tiltAngle: -0.22, color: '#a855f7' },
          { name: 'LELEAKUHONUA (q=65 UA)', semiMajor: 210, semiMinor: 70, offset: 140, tiltAngle: -0.45, color: '#d8b4fe' }
        ]

        tnoOrbits.forEach((tno) => {
          ctx.strokeStyle = tno.color
          ctx.lineWidth = 1.2
          ctx.beginPath()
          for (let a = 0; a <= Math.PI * 2; a += 0.08) {
            const rx = tno.offset + tno.semiMajor * Math.cos(a)
            const ry = tno.semiMinor * Math.sin(a)
            const xRot = rx * Math.cos(tno.tiltAngle) - ry * Math.sin(tno.tiltAngle)
            const yRot = rx * Math.sin(tno.tiltAngle) + ry * Math.cos(tno.tiltAngle)
            const zRot = yRot * 0.18

            const pt = project3D(xRot, yRot, zRot)
            if (a === 0) ctx.moveTo(pt.px, pt.py)
            else ctx.lineTo(pt.px, pt.py)
          }
          ctx.closePath()
          ctx.stroke()
        })

        // Planet Nine Eccentric Counter-Orbit (~485 UA)
        const p9SemiMajor = 360
        const p9SemiMinor = 120
        const p9Offset = -220
        const p9Tilt = 2.75

        ctx.strokeStyle = '#38bdf8'
        ctx.lineWidth = 2.2
        ctx.setLineDash([8, 5])
        ctx.beginPath()
        for (let a = 0; a <= Math.PI * 2; a += 0.06) {
          const rx = p9Offset + p9SemiMajor * Math.cos(a)
          const ry = p9SemiMinor * Math.sin(a)
          const xRot = rx * Math.cos(p9Tilt) - ry * Math.sin(p9Tilt)
          const yRot = rx * Math.sin(p9Tilt) + ry * Math.cos(p9Tilt)
          const zRot = -yRot * 0.22

          const pt = project3D(xRot, yRot, zRot)
          if (a === 0) ctx.moveTo(pt.px, pt.py)
          else ctx.lineTo(pt.px, pt.py)
        }
        ctx.closePath()
        ctx.stroke()
        ctx.setLineDash([])

        // Moving Planet Nine body
        const p9Angle = time * 0.08
        const p9rx = p9Offset + p9SemiMajor * Math.cos(p9Angle)
        const p9ry = p9SemiMinor * Math.sin(p9Angle)
        const p9xRot = p9rx * Math.cos(p9Tilt) - p9ry * Math.sin(p9Tilt)
        const p9yRot = p9rx * Math.sin(p9Tilt) + p9ry * Math.cos(p9Tilt)
        const p9zRot = -p9yRot * 0.22

        const p9P = project3D(p9xRot, p9yRot, p9zRot)

        ctx.fillStyle = '#38bdf8'
        ctx.shadowColor = '#38bdf8'
        ctx.shadowBlur = 18
        ctx.beginPath()
        ctx.arc(p9P.px, p9P.py, Math.max(1, 7 * p9P.depth), 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(p9P.px, p9P.py, Math.max(1.5, 13 * p9P.depth), 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = '#38bdf8'
        ctx.font = '11px "Space Mono", monospace'
        ctx.fillText('PLANETA NUEVE (~485 UA)', p9P.px + 16, p9P.py + 4)

      } else {
        // ==========================================
        // VISTA B: ÓRBITA HELIOSÍNCRONA DE SPHEREx (700 KM)
        // ==========================================
        const earthRadiusPx = 110 * zoom
        const orbitRadiusPx = 175 * zoom // 700 km altitude scale

        // 3D projection for satellite in polar orbit
        const projectEarthSystem = (x, y, z) => {
          const x1 = x * cosY - y * sinY
          const y1 = x * sinY + y * cosY
          const z1 = z

          const x2 = x1
          const y2 = y1 * cosX - z1 * sinX
          const z2 = y1 * sinX + z1 * cosX

          const fov = 700
          const denominator = Math.max(60, fov + z2 * 0.5)
          const depth = Math.max(0.15, Math.min(2.5, fov / denominator))

          return {
            px: cx + x2 * depth,
            py: cy + y2 * depth,
            depth,
            zOrder: z2
          }
        }

        // Draw Sunlight directional rays coming from left
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.25)'
        ctx.lineWidth = 1
        ctx.setLineDash([4, 4])
        for (let i = -3; i <= 3; i++) {
          ctx.beginPath()
          ctx.moveTo(cx - 380, cy + i * 45)
          ctx.lineTo(cx - 160, cy + i * 45)
          ctx.stroke()
        }
        ctx.setLineDash([])

        ctx.fillStyle = '#fbbf24'
        ctx.font = '11px "Space Mono", monospace'
        ctx.fillText('☀ LUZ SOLAR DIRECTA', cx - 360, cy - 160)

        // Draw Earth Atmosphere Glow
        const atmosGrad = ctx.createRadialGradient(cx, cy, earthRadiusPx * 0.95, cx, cy, earthRadiusPx * 1.15)
        atmosGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)')
        atmosGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = atmosGrad
        ctx.beginPath()
        ctx.arc(cx, cy, earthRadiusPx * 1.15, 0, Math.PI * 2)
        ctx.fill()

        // Draw Earth Body (Half in Sun, Half in Night Terminator)
        const earthGrad = ctx.createLinearGradient(cx - earthRadiusPx, cy, cx + earthRadiusPx, cy)
        earthGrad.addColorStop(0, '#1e3a8a') // Day side ocean blue
        earthGrad.addColorStop(0.48, '#0f172a') // Twilight terminator
        earthGrad.addColorStop(0.55, '#020617') // Deep night shadow
        earthGrad.addColorStop(1, '#000000')

        ctx.fillStyle = earthGrad
        ctx.beginPath()
        ctx.arc(cx, cy, earthRadiusPx, 0, Math.PI * 2)
        ctx.fill()

        // Earth Continent outlines
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)'
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(cx - earthRadiusPx * 0.2, cy - earthRadiusPx * 0.1, earthRadiusPx * 0.45, 0.3, 1.8)
        ctx.arc(cx - earthRadiusPx * 0.3, cy + earthRadiusPx * 0.2, earthRadiusPx * 0.35, -0.4, 1.2)
        ctx.stroke()

        // Earth Axial Tilt Line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
        ctx.lineWidth = 1
        ctx.setLineDash([3, 3])
        ctx.beginPath()
        ctx.moveTo(cx - 30, cy - earthRadiusPx * 1.35)
        ctx.lineTo(cx + 30, cy + earthRadiusPx * 1.35)
        ctx.stroke()
        ctx.setLineDash([])

        ctx.fillStyle = '#94a3b8'
        ctx.font = '10px "Space Mono", monospace'
        ctx.fillText('EJE POLAR (23.5°)', cx + 35, cy - earthRadiusPx * 1.2)

        // Draw SPHEREx Sun-Synchronous Polar Orbit (98.2° inclination, aligned with Terminator)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)'
        ctx.lineWidth = 1.8
        ctx.setLineDash([5, 4])
        ctx.beginPath()
        for (let a = 0; a <= Math.PI * 2; a += 0.08) {
          // Polar orbit in Y-Z plane tilted along terminator
          const ox = orbitRadiusPx * Math.sin(a) * 0.18 // small tilt off plane
          const oy = orbitRadiusPx * Math.cos(a) // polar height
          const oz = orbitRadiusPx * Math.sin(a) // depth along terminator

          const pt = projectEarthSystem(ox, oy, oz)
          if (a === 0) ctx.moveTo(pt.px, pt.py)
          else ctx.lineTo(pt.px, pt.py)
        }
        ctx.closePath()
        ctx.stroke()
        ctx.setLineDash([])

        // Moving SPHEREx Satellite Position
        const satAngle = time * 0.8
        const sox = orbitRadiusPx * Math.sin(satAngle) * 0.18
        const soy = orbitRadiusPx * Math.cos(satAngle)
        const soz = orbitRadiusPx * Math.sin(satAngle)

        const satPt = projectEarthSystem(sox, soy, soz)

        // Telescope Scanning Cone pointing 90° away from the Sun into deep space
        const coneLen = 120 * zoom
        const coneTargetX = satPt.px + coneLen * 0.8
        const coneTargetY = satPt.py - coneLen * 0.4

        const coneGrad = ctx.createLinearGradient(satPt.px, satPt.py, coneTargetX, coneTargetY)
        coneGrad.addColorStop(0, 'rgba(251, 146, 60, 0.75)')
        coneGrad.addColorStop(1, 'transparent')

        ctx.fillStyle = coneGrad
        ctx.beginPath()
        ctx.moveTo(satPt.px, satPt.py)
        ctx.lineTo(coneTargetX - 25, coneTargetY - 20)
        ctx.lineTo(coneTargetX + 25, coneTargetY + 20)
        ctx.closePath()
        ctx.fill()

        // SPHEREx Satellite Body
        ctx.fillStyle = '#fb923c'
        ctx.shadowColor = '#fb923c'
        ctx.shadowBlur = 14
        ctx.beginPath()
        ctx.arc(satPt.px, satPt.py, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Golden solar shield on the sunward side
        ctx.strokeStyle = '#fbbf24'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(satPt.px, satPt.py, 10, Math.PI * 0.6, Math.PI * 1.4)
        ctx.stroke()

        // Label
        ctx.fillStyle = '#ffffff'
        ctx.font = '11px "Space Mono", monospace'
        ctx.fillText('SPHEREx (700 km)', satPt.px + 14, satPt.py - 6)
        ctx.fillStyle = '#fb923c'
        ctx.font = '9px "Space Mono", monospace'
        ctx.fillText('ESCUDO SOLAR ACTIVO 24/7', satPt.px + 14, satPt.py + 8)
      }

      animationId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animationId)
  }, [orbitMode, rotX, rotY, zoom, autoRotate, isDragging])

  return (
    <div className="cyber-card hud-viewport-frame" style={{ position: 'relative', width: '100%', height: 'calc(100vh - 140px)', background: '#020306', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(0, 240, 255, 0.25)' }}>
      {/* Aerospace HUD Viewport Corner Accents */}
      <div className="hud-corner hud-corner-tl" />
      <div className="hud-corner hud-corner-tr" />
      <div className="hud-corner hud-corner-bl" />
      <div className="hud-corner hud-corner-br" />

      {/* Sweeping Laser Scan Beam */}
      <div className="hud-scan-beam" />

      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        width={1400}
        height={850}
        style={{ width: '100%', height: '100%', display: 'block', cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* Top Controls Strip */}
      <div style={{ 
        position: 'absolute', 
        top: '16px', 
        left: '20px', 
        right: '20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        pointerEvents: 'none',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', pointerEvents: 'auto' }}>
          <button
            className="cyber-btn"
            style={{ padding: '6px 14px' }}
            onClick={() => {
              soundEngine.playClick()
              onBackToDashboard()
            }}
          >
            <ArrowLeft size={14} />
            <span>VOLVER AL OBSERVATORIO</span>
          </button>

          {/* DUAL ORBIT SWITCHER (A vs B) */}
          <div style={{ display: 'flex', background: 'rgba(7, 10, 18, 0.85)', padding: '3px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              className={`cyber-btn ${orbitMode === 'planet9_outer' ? 'cyber-btn-primary' : ''}`}
              style={{ padding: '5px 12px', fontSize: '0.75rem', fontWeight: 600 }}
              onClick={() => {
                soundEngine.playClick()
                setOrbitMode('planet9_outer')
              }}
            >
              <Orbit size={13} />
              <span>{t.orbitModeA}</span>
            </button>

            <button
              className={`cyber-btn ${orbitMode === 'spherex_earth' ? 'cyber-btn-orange' : ''}`}
              style={{ padding: '5px 12px', fontSize: '0.75rem', fontWeight: 600 }}
              onClick={() => {
                soundEngine.playClick()
                setOrbitMode('spherex_earth')
              }}
            >
              <Globe2 size={13} />
              <span>{t.orbitModeB}</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
          <button
            className={`cyber-btn ${autoRotate ? 'cyber-btn-primary' : ''}`}
            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
            onClick={() => {
              soundEngine.playClick()
              setAutoRotate(!autoRotate)
            }}
          >
            <RotateCcw size={12} />
            <span>{autoRotate ? 'ROTACIÓN AUTOMÁTICA' : 'PAUSADO'}</span>
          </button>

          <button
            className="cyber-btn"
            style={{ padding: '6px 10px' }}
            onClick={() => setZoom(prev => Math.min(3.5, prev + 0.25))}
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>

          <button
            className="cyber-btn"
            style={{ padding: '6px 10px' }}
            onClick={() => setZoom(prev => Math.max(0.4, prev - 0.25))}
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Floating Educational Card */}
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        left: '20px', 
        background: 'rgba(7, 10, 18, 0.94)', 
        border: '1px solid rgba(255, 255, 255, 0.1)', 
        borderRadius: '8px',
        padding: '16px 20px',
        maxWidth: '540px',
        backdropFilter: 'blur(16px)',
        pointerEvents: 'auto',
        boxShadow: '0 12px 36px rgba(0,0,0,0.85)'
      }}>
        {orbitMode === 'planet9_outer' ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge-tag badge-cyan" style={{ fontSize: '0.68rem' }}>
                <Orbit size={11} />
                ÓRBITA A • SISTEMA SOLAR EXTERIOR (500 UA)
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }} className="font-mono">
                {rotX.toFixed(0)}° / {(rotY % 360).toFixed(0)}°
              </span>
            </div>

            <h4 style={{ fontSize: '1rem', color: '#fff', margin: '0 0 6px 0', fontWeight: 600 }}>
              ¿Para qué sirve? La Prueba Gravitacional de Sedna
            </h4>

            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.55', margin: 0 }}>
              Nadie ha fotografiado directamente al Planeta Nueve. Sabemos que existe porque objetos helados lejanos como <strong>Sedna, 2012 VP113 y Leleakuhonua</strong> tienen órbitas agrupadas en la misma dirección (probabilidad de azar menor al 0.007%). La única explicación física es un planeta gigante de 5 a 10 masas terrestres con una <strong>órbita contraria a ~485 UA</strong> (la elipse cian) que los pastorea gravitacionalmente.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge-tag badge-orange" style={{ fontSize: '0.68rem' }}>
                <Globe2 size={11} />
                ÓRBITA B • TELEMETRÍA SPHEREx (700 KM)
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-infrared)' }} className="font-mono">
                98.8 MIN / VUELTA
              </span>
            </div>

            <h4 style={{ fontSize: '1rem', color: '#fff', margin: '0 0 6px 0', fontWeight: 600 }}>
              ¿Para qué sirve? Órbita Heliosíncrona en el Terminador
            </h4>

            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.55', margin: '0 0 10px 0' }}>
              Los detectores de SPHEREx funcionan a <strong>-233°C (40 Kelvin)</strong>. Si el Sol les diera de frente, se quemarían al instante. Por eso viaja en una órbita polar a 700 km justo sobre la frontera día/noche (el terminador). El escudo solar le da la espalda al Sol 24/7 mientras su cono infrarrojo barre el firmamento libre de deslumbramiento.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
              <div>
                <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>ALTITUD POLAR</div>
                <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }} className="font-mono">700 km</div>
              </div>
              <div>
                <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>INCLINACIÓN</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600 }} className="font-mono">98.2°</div>
              </div>
              <div>
                <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>RELEVO TOTAL</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-infrared)', fontWeight: 600 }} className="font-mono">CADA 6 MESES</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
