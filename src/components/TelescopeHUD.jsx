import React, { useState, useEffect, useRef } from 'react'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Crosshair, 
  Layers, 
  Sliders, 
  Eye, 
  Maximize2,
  Sparkles,
  Info,
  Database,
  ExternalLink,
  Radio
} from 'lucide-react'
import { soundEngine } from '../services/soundEngine'
import { getRealNasaCutoutUrls } from '../services/irsaService'

export function TelescopeHUD({ 
  candidate, 
  t, 
  isProMode, 
  onCandidateLocked 
}) {
  const canvasRef = useRef(null)
  
  // Data source toggle: 'spherex_multitemporal' | 'real_nasa_irsa'
  const [dataSource, setDataSource] = useState('spherex_multitemporal')
  
  const [viewMode, setViewMode] = useState('blink') // 'blink' | 'split' | 'diff' | 'rgb'
  const [activeEpoch, setActiveEpoch] = useState(1) // 1, 2, 3
  const [isBlinking, setIsBlinking] = useState(true)
  const [blinkSpeedHz, setBlinkSpeedHz] = useState(2.0)
  const [splitPos, setSplitPos] = useState(0.5) // 0 to 1
  const [zoom, setZoom] = useState(1.2)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showCrosshairs, setShowCrosshairs] = useState(true)
  const [isLockedOn, setIsLockedOn] = useState(false)
  const [cursorSkyPos, setCursorSkyPos] = useState({ ra: candidate.ra, dec: candidate.dec })

  // Real NASA IRSA Cutout metadata
  const realNasaData = getRealNasaCutoutUrls(candidate.raDeg, candidate.decDeg, 10)

  // Procedural background stars (stable across renders)
  const starsRef = useRef([])
  useEffect(() => {
    const stars = []
    let seed = 42
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }

    for (let i = 0; i < 180; i++) {
      stars.push({
        x: pseudoRandom() * 1000,
        y: pseudoRandom() * 1000,
        radius: 0.8 + pseudoRandom() * 2.2,
        brightness: 0.35 + pseudoRandom() * 0.65,
        color: pseudoRandom() > 0.6 ? '#bae6fd' : (pseudoRandom() > 0.4 ? '#fef08a' : '#f8fafc'),
        diffractionSpike: pseudoRandom() > 0.92
      })
    }
    starsRef.current = stars
  }, [])

  // Auto-Blink Timer
  useEffect(() => {
    if (viewMode !== 'blink' || !isBlinking || dataSource === 'real_nasa_irsa') return

    const intervalMs = 1000 / blinkSpeedHz
    const timer = setInterval(() => {
      setActiveEpoch(prev => (prev >= 3 ? 1 : prev + 1))
    }, intervalMs)

    return () => clearInterval(timer)
  }, [viewMode, isBlinking, blinkSpeedHz, dataSource])

  // Center view on target
  const handleLockTarget = () => {
    soundEngine.playLock()
    setIsLockedOn(true)
    const ep = candidate.epochs[activeEpoch - 1]
    setPan({
      x: -(ep.x - 500) * 0.8,
      y: -(ep.y - 500) * 0.8
    })
    setZoom(2.2)
    if (onCandidateLocked) onCandidateLocked(candidate)
  }

  const handleResetView = () => {
    soundEngine.playClick()
    setZoom(1.2)
    setPan({ x: 0, y: 0 })
    setIsLockedOn(false)
  }

  // Mouse drag & zoom
  const handleMouseDown = (e) => {
    if (viewMode === 'split') {
      const rect = canvasRef.current.getBoundingClientRect()
      const clickRatio = (e.clientX - rect.left) / rect.width
      if (Math.abs(clickRatio - splitPos) < 0.05) {
        return
      }
    }
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const normX = mouseX / rect.width
    const normY = mouseY / rect.height
    const raOffset = (normX - 0.5) * 0.15
    const decOffset = (0.5 - normY) * 0.15
    setCursorSkyPos({
      ra: `${(candidate.raDeg + raOffset).toFixed(4)}°`,
      dec: `${(candidate.decDeg + decOffset).toFixed(4)}°`
    })

    if (e.buttons === 1 && viewMode === 'split') {
      const ratio = Math.max(0.05, Math.min(0.95, mouseX / rect.width))
      setSplitPos(ratio)
      return
    }

    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.15 : 0.15
    setZoom(prev => Math.min(4.0, Math.max(0.8, prev + delta)))
  }

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dataSource === 'real_nasa_irsa') return
    const ctx = canvas.getContext('2d')
    let animationId

    const render = () => {
      const w = canvas.width
      const h = canvas.height

      // Background deep space
      ctx.fillStyle = '#060913'
      ctx.fillRect(0, 0, w, h)

      ctx.save()
      ctx.translate(w / 2 + pan.x, h / 2 + pan.y)
      ctx.scale(zoom, zoom)
      ctx.translate(-w / 2, -h / 2)

      const stars = starsRef.current

      // Helper to draw stars
      const drawBackgroundStars = (alpha = 1.0, colorOverride = null) => {
        stars.forEach(star => {
          ctx.fillStyle = colorOverride || star.color
          ctx.globalAlpha = star.brightness * alpha
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
          ctx.fill()

          if (star.diffractionSpike) {
            ctx.strokeStyle = colorOverride || star.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(star.x - star.radius * 3.5, star.y)
            ctx.lineTo(star.x + star.radius * 3.5, star.y)
            ctx.moveTo(star.x, star.y - star.radius * 3.5)
            ctx.lineTo(star.x, star.y + star.radius * 3.5)
            ctx.stroke()
          }
        })
        ctx.globalAlpha = 1.0
      }

      // Helper to draw moving candidate object
      const drawCandidateObject = (epIndex, color = '#38bdf8', glow = '#38bdf8', alpha = 1.0) => {
        const ep = candidate.epochs[epIndex]
        if (!ep || ep.brightness === 0) return

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = color
        ctx.shadowColor = glow
        ctx.shadowBlur = 14 * ep.brightness

        ctx.beginPath()
        ctx.arc(ep.x, ep.y, ep.fwhm, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Reticle if locked
        if (isLockedOn) {
          ctx.strokeStyle = '#38bdf8'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(ep.x, ep.y, ep.fwhm + 12, 0, Math.PI * 2)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(ep.x - ep.fwhm - 16, ep.y)
          ctx.lineTo(ep.x - ep.fwhm - 6, ep.y)
          ctx.moveTo(ep.x + ep.fwhm + 6, ep.y)
          ctx.lineTo(ep.x + ep.fwhm + 16, ep.y)
          ctx.moveTo(ep.x, ep.y - ep.fwhm - 16)
          ctx.lineTo(ep.x, ep.y - ep.fwhm - 6)
          ctx.moveTo(ep.x, ep.y + ep.fwhm + 6)
          ctx.lineTo(ep.x, ep.y + ep.fwhm + 16)
          ctx.stroke()
        }

        ctx.restore()
      }

      if (viewMode === 'blink') {
        drawBackgroundStars(0.85)
        drawCandidateObject(activeEpoch - 1, '#38bdf8', '#38bdf8')

      } else if (viewMode === 'split') {
        const splitPixel = splitPos * w

        // Draw Left (Epoch 1)
        ctx.save()
        ctx.beginPath()
        ctx.rect(0, 0, splitPixel, h)
        ctx.clip()
        drawBackgroundStars(0.85, '#93c5fd')
        drawCandidateObject(0, '#38bdf8', '#38bdf8')
        ctx.restore()

        // Draw Right (Epoch 2)
        ctx.save()
        ctx.beginPath()
        ctx.rect(splitPixel, 0, w - splitPixel, h)
        ctx.clip()
        drawBackgroundStars(0.85, '#fed7aa')
        drawCandidateObject(1, '#fb923c', '#fb923c')
        ctx.restore()

        // Divider
        ctx.strokeStyle = '#38bdf8'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(splitPixel, 0)
        ctx.lineTo(splitPixel, h)
        ctx.stroke()

      } else if (viewMode === 'diff') {
        // Photometric Difference (I2 - I1)
        drawBackgroundStars(0.12, '#64748b')

        const ep1 = candidate.epochs[0]
        const ep2 = candidate.epochs[1]

        if (ep1 && ep1.brightness > 0) {
          ctx.fillStyle = '#0f172a'
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(ep1.x, ep1.y, ep1.fwhm, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
        }

        if (ep2 && ep2.brightness > 0) {
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = '#38bdf8'
          ctx.shadowBlur = 14
          ctx.beginPath()
          ctx.arc(ep2.x, ep2.y, ep2.fwhm, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }

        if (ep1 && ep2 && ep1.brightness > 0 && ep2.brightness > 0) {
          ctx.strokeStyle = '#fbbf24'
          ctx.lineWidth = 1.2
          ctx.setLineDash([3, 2])
          ctx.beginPath()
          ctx.moveTo(ep1.x, ep1.y)
          ctx.lineTo(ep2.x, ep2.y)
          ctx.stroke()
          ctx.setLineDash([])
        }

      } else if (viewMode === 'rgb') {
        drawBackgroundStars(0.7)
        drawCandidateObject(activeEpoch - 1, '#fb923c', '#fbbf24')
      }

      ctx.restore()

      // Crosshairs
      if (showCrosshairs) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)'
        ctx.lineWidth = 1
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.moveTo(w / 2, 0)
        ctx.lineTo(w / 2, h)
        ctx.moveTo(0, h / 2)
        ctx.lineTo(w, h / 2)
        ctx.stroke()
        ctx.setLineDash([])
      }

      // Scale Bar
      const barLenPx = 50 * zoom
      ctx.strokeStyle = '#38bdf8'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(w - 24 - barLenPx, h - 20)
      ctx.lineTo(w - 24, h - 20)
      ctx.stroke()

      ctx.fillStyle = '#38bdf8'
      ctx.font = '10px "Space Mono", monospace'
      ctx.fillText(`60" ARCSEC (${(zoom).toFixed(1)}x)`, w - 30 - barLenPx, h - 26)

      animationId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animationId)
  }, [viewMode, activeEpoch, isBlinking, splitPos, zoom, pan, showCrosshairs, isLockedOn, candidate, dataSource])

  return (
    <div className="cyber-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar: Data Mode Toggle + View Modes */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '12px 18px', 
        background: 'rgba(10, 15, 26, 0.95)', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {/* Source Switcher: SPHEREx Multi-Epoch vs NASA IRSA Real Archive */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.04)', padding: '3px', borderRadius: '6px' }}>
          <button 
            className={`cyber-btn ${dataSource === 'spherex_multitemporal' ? 'cyber-btn-primary' : ''}`}
            style={{ padding: '4px 10px', fontSize: '0.74rem' }}
            onClick={() => {
              soundEngine.playClick()
              setDataSource('spherex_multitemporal')
            }}
          >
            <RotateCcw size={12} />
            <span>{t.viewModeSpherex}</span>
          </button>

          <button 
            className={`cyber-btn ${dataSource === 'real_nasa_irsa' ? 'cyber-btn-orange' : ''}`}
            style={{ padding: '4px 10px', fontSize: '0.74rem' }}
            onClick={() => {
              soundEngine.playClick()
              setDataSource('real_nasa_irsa')
            }}
          >
            <Database size={12} />
            <span>{t.viewModeNasaArchive}</span>
          </button>
        </div>

        {/* View Modes (Only in Multi-Temporal Mode) */}
        {dataSource === 'spherex_multitemporal' && (
          <div style={{ display: 'flex', gap: '5px' }}>
            <button 
              className={`cyber-btn ${viewMode === 'blink' ? 'cyber-btn-primary' : ''}`}
              style={{ padding: '4px 9px', fontSize: '0.74rem' }}
              onClick={() => {
                soundEngine.playClick()
                setViewMode('blink')
              }}
            >
              <RotateCcw size={12} />
              {t.modeBlink}
            </button>

            <button 
              className={`cyber-btn ${viewMode === 'split' ? 'cyber-btn-primary' : ''}`}
              style={{ padding: '4px 9px', fontSize: '0.74rem' }}
              onClick={() => {
                soundEngine.playClick()
                setViewMode('split')
              }}
            >
              <Sliders size={12} />
              {t.modeSplit}
            </button>

            <button 
              className={`cyber-btn ${viewMode === 'diff' ? 'cyber-btn-primary' : ''}`}
              style={{ padding: '4px 9px', fontSize: '0.74rem' }}
              onClick={() => {
                soundEngine.playClick()
                setViewMode('diff')
              }}
            >
              <Layers size={12} />
              {t.modeDiff}
            </button>

            <button 
              className={`cyber-btn ${viewMode === 'rgb' ? 'cyber-btn-primary' : ''}`}
              style={{ padding: '4px 9px', fontSize: '0.74rem' }}
              onClick={() => {
                soundEngine.playClick()
                setViewMode('rgb')
              }}
            >
              <Eye size={12} />
              {t.modeRgb}
            </button>
          </div>
        )}

        {/* Action Controls: Lock, Zoom, Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <button 
            className="cyber-btn cyber-btn-primary"
            style={{ padding: '4px 9px', fontSize: '0.74rem' }}
            onClick={handleLockTarget}
            title="Auto-center on Candidate Object"
          >
            <Crosshair size={12} />
            {t.autoLock}
          </button>

          <button 
            className="cyber-btn"
            style={{ padding: '4px 7px' }}
            onClick={() => setZoom(prev => Math.min(4.0, prev + 0.3))}
            title="Zoom In"
          >
            <ZoomIn size={13} />
          </button>

          <button 
            className="cyber-btn"
            style={{ padding: '4px 7px' }}
            onClick={() => setZoom(prev => Math.max(0.8, prev - 0.3))}
            title="Zoom Out"
          >
            <ZoomOut size={13} />
          </button>

          <button 
            className="cyber-btn"
            style={{ padding: '4px 7px' }}
            onClick={handleResetView}
            title="Reset View"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      {dataSource === 'spherex_multitemporal' ? (
        <div 
          className="hud-viewport-frame"
          style={{ 
            position: 'relative', 
            width: '100%', 
            height: '460px', 
            background: '#040711',
            cursor: isDragging ? 'grabbing' : 'crosshair'
          }}
        >
          {/* Aerospace HUD Viewport Corner Accents */}
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />

          {/* Sweeping Laser Scan Beam */}
          <div className="hud-scan-beam" />

          {/* Astronomical Cardinal Orientation (North & East) */}
          <div className="hud-cardinal-compass">
            <div className="axis-indicator">
              <span className="label-n">N</span>
              <span className="label-e">E</span>
            </div>
          </div>

          {/* Central Target Reticle Ring */}
          {showCrosshairs && <div className="hud-reticle-ring" />}

          <canvas 
            ref={canvasRef}
            width={1000}
            height={600}
            style={{ width: '100%', height: '100%', display: 'block' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
          />

          {/* Bottom Left Telemetry Overlay */}
          <div style={{ 
            position: 'absolute', 
            bottom: '12px', 
            left: '14px', 
            background: 'rgba(5, 10, 24, 0.92)', 
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.75), inset 0 0 10px rgba(0, 240, 255, 0.08)',
            padding: '7px 14px', 
            borderRadius: '4px',
            display: 'flex', 
            gap: '14px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-cyan)',
            pointerEvents: 'none',
            backdropFilter: 'blur(10px)',
            zIndex: 6
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>RA: </span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{cursorSkyPos.ra}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>DEC: </span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{cursorSkyPos.dec}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>MAG: </span>
              <span style={{ color: 'var(--accent-infrared)', fontWeight: 600 }}>{candidate.apparentMagNIR} NIR</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>ZOOM: </span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{zoom.toFixed(1)}x</span>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.12)', paddingLeft: '10px' }}>
              <span style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="radar-dot" style={{ width: '4px', height: '4px' }} />
                WCS: NOMINAL
              </span>
            </div>
          </div>

          {/* Top Right Epoch Timeline Indicator */}
          <div style={{ 
            position: 'absolute', 
            top: '12px', 
            right: '14px', 
            display: 'flex', 
            gap: '6px',
            pointerEvents: 'auto',
            zIndex: 6
          }}>
            {[1, 2, 3].map(ep => (
              <button
                key={ep}
                onClick={() => {
                  soundEngine.playBlink(ep)
                  setActiveEpoch(ep)
                  setIsBlinking(false)
                }}
                className={`cyber-btn ${activeEpoch === ep ? 'cyber-btn-primary' : ''}`}
                style={{
                  padding: '4px 11px',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  boxShadow: activeEpoch === ep ? '0 0 16px rgba(0, 240, 255, 0.45)' : 'none'
                }}
              >
                PASE {ep} ({candidate.epochs[ep - 1].date.substring(0, 7)})
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Real NASA IRSA Image Archive Viewer */
        <div style={{ 
          minHeight: '460px', 
          background: '#070a14', 
          padding: '24px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-tag badge-green">
                <span className="radar-dot"></span>
                {t.liveIrsaConnected}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }} className="font-mono">
                Coordenadas: {realNasaData.coordsLabel}
              </span>
            </div>

            <a 
              href={realNasaData.finderChartApiUrl} 
              target="_blank" 
              rel="noreferrer"
              className="cyber-btn"
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              <ExternalLink size={12} />
              API Cutout JSON de Caltech
            </a>
          </div>

          {/* NASA IRSA Real Images Grid (AllWISE & 2MASS) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '16px' 
          }}>
            {/* WISE W1 / W2 (Near Infrared 3.4 & 4.6 µm) */}
            <div style={{ 
              background: 'rgba(15, 21, 38, 0.75)', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              borderRadius: '8px', 
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-infrared)', fontWeight: 600 }}>
                  NASA AllWISE (3.4 µm & 4.6 µm)
                </span>
                <span className="badge-tag badge-orange" style={{ fontSize: '0.62rem' }}>
                  NIR COINCIDENTE
                </span>
              </div>

              <div style={{ 
                height: '180px', 
                background: '#03050a', 
                borderRadius: '6px', 
                border: '1px solid rgba(255,255,255,0.06)', 
                overflow: 'hidden', 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={`https://skyview.gsfc.nasa.gov/current/cgi/runquery.pl?Survey=WISE%203.4&Position=${candidate.raDeg},${candidate.decDeg}&Size=0.08&Return=JPG`} 
                  alt="NASA AllWISE Cutout"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    // Fallback visual simulation if network blocks direct NASA SkyView JPG
                    e.target.style.display = 'none'
                  }}
                />
                <div style={{ position: 'absolute', bottom: '6px', left: '8px', fontSize: '0.68rem', color: '#94a3b8' }} className="font-mono">
                  Banda W1 (3.4 µm)
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                Corte fotométrico en la banda de absorción de metano. En esta longitud de onda, los cuerpos fríos del Sistema Solar exterior presentan una fuerte caída de flujo.
              </p>
            </div>

            {/* 2MASS Infrarrojo Cercano (J/H/Ks) */}
            <div style={{ 
              background: 'rgba(15, 21, 38, 0.75)', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              borderRadius: '8px', 
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  NASA / IPAC 2MASS (1.25 - 2.17 µm)
                </span>
                <span className="badge-tag badge-cyan" style={{ fontSize: '0.62rem' }}>
                  LÍNEA BASE HISTÓRICA
                </span>
              </div>

              <div style={{ 
                height: '180px', 
                background: '#03050a', 
                borderRadius: '6px', 
                border: '1px solid rgba(255,255,255,0.06)', 
                overflow: 'hidden', 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={`https://skyview.gsfc.nasa.gov/current/cgi/runquery.pl?Survey=2MASS-K&Position=${candidate.raDeg},${candidate.decDeg}&Size=0.08&Return=JPG`} 
                  alt="NASA 2MASS Cutout"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <div style={{ position: 'absolute', bottom: '6px', left: '8px', fontSize: '0.68rem', color: '#94a3b8' }} className="font-mono">
                  Banda Ks (2.17 µm)
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                Observación infrarroja previa que sirve de línea base histórica para descartar estrellas fijas con movimiento propio nulo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Timeline Controls Bar */}
      {dataSource === 'spherex_multitemporal' && (
        <div style={{ 
          padding: '12px 18px', 
          background: 'rgba(10, 15, 26, 0.95)', 
          borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Blink Speed Slider & Pause */}
          {viewMode === 'blink' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                className="cyber-btn"
                style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                onClick={() => {
                  soundEngine.playClick()
                  setIsBlinking(!isBlinking)
                }}
              >
                {isBlinking ? <Pause size={12} /> : <Play size={12} />}
                <span>{isBlinking ? 'PAUSAR' : 'REANUDAR'}</span>
              </button>

              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {t.blinkSpeed}: <strong style={{ color: 'var(--accent-cyan)' }} className="font-mono">{blinkSpeedHz.toFixed(1)} Hz</strong>
              </span>

              <input 
                type="range" 
                min="0.5" 
                max="5.0" 
                step="0.5"
                value={blinkSpeedHz} 
                onChange={(e) => setBlinkSpeedHz(parseFloat(e.target.value))}
                style={{ accentColor: 'var(--accent-cyan)', width: '100px', cursor: 'pointer' }}
              />
            </div>
          )}

          {/* Split Swipe Info */}
          {viewMode === 'split' && (
            <div style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Info size={13} />
              <span>Desliza el cursor horizontalmente sobre la imagen para comparar el Pase 1 y el Pase 2.</span>
            </div>
          )}

          {/* Photometric Diff Info */}
          {viewMode === 'diff' && (
            <div style={{ fontSize: '0.74rem', color: 'var(--accent-infrared)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={13} />
              <span>Sustracción de flujo: las estrellas fijas se anulan y solo brilla el objeto en movimiento orbital.</span>
            </div>
          )}

          {/* Active Target Quick Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              OBJETIVO:
            </span>
            <span className="font-mono" style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem' }}>
              {candidate.name}
            </span>
            <span className="badge-tag badge-cyan" style={{ fontSize: '0.62rem' }}>
              {candidate.constellation}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
