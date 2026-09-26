import React, { useEffect, useRef } from 'react'
import { 
  Telescope, 
  ArrowRight, 
  Sparkles, 
  Orbit, 
  BookOpen, 
  Database, 
  Award, 
  Volume2, 
  VolumeX, 
  Globe2,
  Compass,
  Rocket,
  ChevronDown
} from 'lucide-react'
import { soundEngine } from '../services/soundEngine'

export function HeroGateway({
  onStartCompleteJourney,
  onOpenObservatory,
  onOpen3DBelts,
  onOpenJudging,
  onOpenIrsa,
  lang,
  setLang,
  isMuted,
  setIsMuted
}) {
  const canvasRef = useRef(null)

  // Animated deep space starfield with gentle drifting nebula
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let time = 0

    const stars = []
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.18 + 0.04,
        alpha: Math.random() * 0.6 + 0.3,
        color: Math.random() > 0.7 ? '#38bdf8' : (Math.random() > 0.4 ? '#fbbf24' : '#ffffff')
      })
    }

    const resize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      time += 0.012
      ctx.fillStyle = '#05070d'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Soft nebula background glow
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const grad = ctx.createRadialGradient(
        cx + Math.sin(time * 0.5) * 50, 
        cy + Math.cos(time * 0.5) * 35, 
        40, 
        cx, 
        cy, 
        canvas.width * 0.55
      )
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.05)')
      grad.addColorStop(0.5, 'rgba(192, 132, 252, 0.03)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw drifting stars
      stars.forEach(star => {
        star.y += star.speed
        if (star.y > canvas.height) star.y = 0

        ctx.fillStyle = star.color
        ctx.globalAlpha = star.alpha * (0.7 + 0.3 * Math.sin(time * 2 + star.x))
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1.0

      animationId = requestAnimationFrame(render)
    }

    render()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 32px' }}>
      {/* Background Starfield Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Top Floating Navigation Bar */}
      <header style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        {/* Left Project Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '6px', 
            background: 'rgba(56, 189, 248, 0.12)', 
            border: '1px solid rgba(56, 189, 248, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-cyan)'
          }}>
            <Telescope size={18} />
          </div>

          <div>
            <div className="badge-tag badge-cyan" style={{ fontSize: '0.66rem', padding: '2px 8px' }}>
              <span className="radar-dot"></span>
              NASA SPACE APPS 2026
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.04em', marginTop: '2px' }} className="font-mono">
              CHALLENGE: PLANET X AND SPHEREx
            </div>
          </div>
        </div>

        {/* Right Action Quick Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="cyber-btn"
            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
            onClick={() => {
              soundEngine.playClick()
              setLang(lang === 'es' ? 'en' : 'es')
            }}
          >
            <Globe2 size={13} />
            <span className="font-mono">{lang.toUpperCase()}</span>
          </button>

          <button 
            className="cyber-btn"
            style={{ 
              padding: '6px 12px', 
              fontSize: '0.75rem',
              borderColor: !isMuted ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)'
            }}
            onClick={() => {
              const muted = soundEngine.toggleMute()
              setIsMuted(muted)
              if (!muted) {
                soundEngine.init()
                soundEngine.startAmbient()
                soundEngine.playClick()
              }
            }}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} color="var(--accent-cyan)" />}
            <span style={{ color: !isMuted ? 'var(--accent-cyan)' : 'inherit' }}>
              {isMuted ? (lang === 'es' ? 'MÚSICA OFF' : 'MUSIC OFF') : (lang === 'es' ? 'MÚSICA ON' : 'MUSIC ON')}
            </span>
          </button>

          <button 
            className="cyber-btn"
            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
            onClick={() => {
              soundEngine.playClick()
              onOpenIrsa()
            }}
          >
            <Database size={13} />
            <span>NASA IRSA TAP</span>
          </button>

          <button 
            className="cyber-btn cyber-btn-primary"
            style={{ padding: '6px 14px', fontSize: '0.75rem' }}
            onClick={() => {
              soundEngine.playClick()
              onOpenJudging()
            }}
          >
            <BookOpen size={13} />
            <span>{lang === 'es' ? 'GUÍA DE MISIÓN' : 'MISSION MANUAL'}</span>
          </button>
        </div>
      </header>

      {/* Monumental Central Hero Section */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1020px', margin: '40px auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
        {/* Orbital Status Pill */}
        <div style={{ 
          background: 'rgba(15, 21, 38, 0.75)', 
          border: '1px solid rgba(255, 255, 255, 0.12)', 
          padding: '5px 16px', 
          borderRadius: '30px', 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '10px'
        }}>
          <span className="radar-dot"></span>
          <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--accent-cyan)' }}>
            RELEVO MULTITEMPORAL SPHEREx • PASES SEMESTRALES 1, 2 Y 3
          </span>
        </div>

        {/* Monumental Main Title */}
        <h1 style={{ 
          fontSize: 'clamp(2.8rem, 8vw, 6rem)', 
          fontWeight: 700, 
          letterSpacing: '-0.02em', 
          lineHeight: '0.98', 
          margin: 0,
          background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 60%, #38bdf8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          SPHEREx
        </h1>

        {/* Subtitle */}
        <div className="font-mono" style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.35rem)', color: 'var(--text-main)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
          {lang === 'es' ? 'LA BÚSQUEDA DEL PLANETA NUEVE' : 'THE HUNT FOR PLANET NINE'}
        </div>

        {/* Briefing Text */}
        <p style={{ maxWidth: '660px', fontSize: '1rem', lineHeight: '1.65', color: '#cbd5e1', margin: '4px 0 16px 0' }}>
          {lang === 'es' 
            ? 'Desde 2025, el telescopio espacial SPHEREx de la NASA cartografía el cielo completo cada 6 meses en 102 bandas infrarrojas. Compara imágenes de los relevos en el tiempo, filtra millones de rayos cósmicos y descubre las señales del planeta escondido.'
            : 'Since 2025, NASA’s SPHEREx space observatory maps the entire sky every 6 months in 102 near-infrared bands. Compare multi-epoch sky imagery over time, filter cosmic rays, and discover signatures of the hidden ninth planet.'}
        </p>

        {/* Action Button: Single Direct Portal to the Mission Journey */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', marginTop: '12px' }}>
          <button
            className="cyber-btn cyber-btn-primary anim-glow-pulse"
            style={{ 
              padding: '16px 40px', 
              fontSize: '1.02rem', 
              fontWeight: 700,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              letterSpacing: '0.04em',
              boxShadow: '0 0 35px rgba(56, 189, 248, 0.4), inset 0 0 15px rgba(56, 189, 248, 0.2)'
            }}
            onClick={() => {
              soundEngine.playTriumph()
              onStartCompleteJourney()
            }}
          >
            <Rocket size={20} />
            <span>{lang === 'es' ? 'INICIAR MISIÓN: LA ODISEA DEL PLANETA NUEVE' : 'BEGIN MISSION: THE ODYSSEY OF PLANET NINE'}</span>
            <ArrowRight size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px' }} className="font-mono">
            <span className="radar-dot"></span>
            <span>{lang === 'es' ? 'EXPLORACIÓN NARRATIVA EN 4 ACTOS Y ANÁLISIS CIENTÍFICO' : '4-ACT NARRATIVE EXPLORATION & SCIENTIFIC ANALYSIS'}</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Counter Strip */}
      <footer style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '18px' }}>
        <div style={{ background: 'rgba(15, 21, 38, 0.7)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '10px 16px' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }} className="font-mono">
            RESOLUCIÓN ESPECTRAL
          </div>
          <div className="font-mono" style={{ fontSize: '1.05rem', color: 'var(--accent-cyan)', fontWeight: 700, marginTop: '2px' }}>
            102 CANALES (0.75 - 5.0 µm)
          </div>
        </div>

        <div style={{ background: 'rgba(15, 21, 38, 0.7)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '10px 16px' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }} className="font-mono">
            CADENCIA DEL SONDEO
          </div>
          <div className="font-mono" style={{ fontSize: '1.05rem', color: '#fbbf24', fontWeight: 700, marginTop: '2px' }}>
            TODO EL CIELO CADA 6 MESES
          </div>
        </div>

        <div style={{ background: 'rgba(15, 21, 38, 0.7)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '10px 16px' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }} className="font-mono">
            DISTANCIA ESTIMADA PLANETA 9
          </div>
          <div className="font-mono" style={{ fontSize: '1.05rem', color: 'var(--accent-infrared)', fontWeight: 700, marginTop: '2px' }}>
            ~485 UA (11,400 AÑOS)
          </div>
        </div>

        <div style={{ background: 'rgba(15, 21, 38, 0.7)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '10px 16px' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }} className="font-mono">
            PIPELINE DE DATOS
          </div>
          <div className="font-mono" style={{ fontSize: '1.05rem', color: '#34d399', fontWeight: 700, marginTop: '2px' }}>
            NASA / CALTECH IPAC IRSA TAP
          </div>
        </div>
      </footer>
    </div>
  )
}
