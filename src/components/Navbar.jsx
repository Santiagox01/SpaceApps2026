import React, { useState, useEffect } from 'react'
import { 
  Telescope, 
  Volume2, 
  VolumeX, 
  Globe2, 
  BookOpen, 
  Database, 
  Activity, 
  Orbit, 
  Crosshair, 
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { soundEngine } from '../services/soundEngine'

export function Navbar({
  lang,
  setLang,
  t,
  isMuted,
  setIsMuted,
  isProMode,
  setIsProMode,
  activeTab,
  setActiveTab,
  onGoHero,
  onOpenJudging
}) {
  const [utcTime, setUtcTime] = useState('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setUtcTime(now.toISOString().substring(11, 19) + ' UTC')
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAudioToggle = () => {
    const muted = soundEngine.toggleMute()
    setIsMuted(muted)
    if (!muted) {
      soundEngine.init()
      soundEngine.startAmbient()
      soundEngine.playClick()
    }
  }

  // 5 Mission Control Segments exactly as in reference design
  const navTabs = [
    { 
      id: 'story', 
      num: '01', 
      title: 'EXPEDIENTE', 
      sub: 'Planeta X', 
      icon: Sparkles 
    },
    { 
      id: 'observatory', 
      num: '02', 
      title: 'OBSERVATORIO', 
      sub: 'Temporal', 
      icon: Crosshair 
    },
    { 
      id: 'spectroscopy', 
      num: '03', 
      title: 'ESPECTROSCOPÍA', 
      sub: '102 Bandas', 
      icon: Activity 
    },
    { 
      id: 'belts3d', 
      num: '04', 
      title: 'SIMULADOR', 
      sub: 'Órbitas (A y B)', 
      icon: Orbit 
    },
    { 
      id: 'irsa', 
      num: '05', 
      title: 'CONSOLA IRSA', 
      sub: 'Datos NASA', 
      icon: Database 
    }
  ]

  // Step Calculation for the Stepped Progress Rail
  const stepMap = {
    hero: { idx: 1, pct: 20 },
    story: { idx: 1, pct: 20 },
    observatory: { idx: 2, pct: 40 },
    spectroscopy: { idx: 3, pct: 60 },
    belts3d: { idx: 4, pct: 80 },
    irsa: { idx: 5, pct: 100 }
  }

  const currentStep = stepMap[activeTab] || { idx: 1, pct: 20 }

  return (
    <header className="nav-bridge-container">
      {/* ===================================================================
          ROW 1: BRAND LOGO + 5 SEGMENTED AEROSPACE TABS
          =================================================================== */}
      <div className="nav-top-row">
        {/* Left: SPHEREx Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div 
            onClick={() => {
              soundEngine.playClick()
              if (onGoHero) {
                onGoHero()
              } else if (setActiveTab) {
                setActiveTab('story')
              }
            }}
            title={lang === 'es' ? 'Volver al Inicio / Portada' : 'Back to Top / Hero'}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: 'pointer' 
            }}
          >
            {/* Tech Bracket around icon */}
            <div style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '4px', 
              background: 'rgba(0, 240, 255, 0.12)', 
              border: '1.5px solid var(--accent-cyan)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
              boxShadow: '0 0 16px rgba(0, 240, 255, 0.25)'
            }}>
              <Telescope size={20} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.04em', color: '#ffffff' }}>
                  SPHEREx
                </span>
                <span className="badge-tag badge-cyan" style={{ fontSize: '0.62rem', padding: '2px 7px' }}>
                  <span className="radar-dot" style={{ width: '4px', height: '4px' }} />
                  NASA 2026
                </span>
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }} className="font-mono">
                Planet X Multi-Temporal Hunter
              </div>
            </div>
          </div>
        </div>

        {/* Right: 5 Segmented Navigation Tabs */}
        <nav style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {navTabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                className={`nav-tab-segmented ${isActive ? 'active' : ''}`}
                onClick={() => {
                  soundEngine.playClick()
                  if (setActiveTab) {
                    setActiveTab(tab.id)
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <div style={{ 
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-dim)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Icon size={16} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="font-mono" style={{ 
                    fontSize: '0.74rem', 
                    fontWeight: 700, 
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    letterSpacing: '0.04em'
                  }}>
                    <span style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)', marginRight: '4px' }}>
                      {tab.num}
                    </span>
                    {tab.title}
                  </span>
                  <span style={{ 
                    fontSize: '0.66rem', 
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-dim)',
                    letterSpacing: '0.02em'
                  }}>
                    {tab.sub}
                  </span>
                </div>
              </button>
            )
          })}
        </nav>
      </div>

      {/* ===================================================================
          ROW 2: TELEMETRY BADGES, UTC CLOCK, UTILITIES & STEPPED PROGRESS
          =================================================================== */}
      <div className="nav-bottom-row">
        {/* Left Utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Mission Flight Telemetry Badge */}
          <div className="hud-telemetry-pill">
            <span className="radar-dot" style={{ width: '5px', height: '5px' }} />
            <span className="font-mono hud-telemetry-text">
              POLAR ORBIT <span style={{ color: 'var(--accent-cyan)' }}>700 KM</span>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span className="font-mono" style={{ color: 'var(--accent-cyan)', fontSize: '0.68rem', fontWeight: 600 }}>
              102-CH
            </span>
            {!isMuted && (
              <div style={{ display: 'inline-flex', gap: '2px', alignItems: 'center', height: '12px', marginLeft: '2px' }}>
                <span className="audio-bar" style={{ animationDelay: '0.1s' }} />
                <span className="audio-bar" style={{ animationDelay: '0.3s' }} />
                <span className="audio-bar" style={{ animationDelay: '0.2s' }} />
              </div>
            )}
          </div>

          {/* UTC Clock */}
          <div className="font-mono" style={{ 
            fontSize: '0.72rem', 
            color: 'var(--accent-cyan)', 
            background: 'rgba(0, 240, 255, 0.05)', 
            padding: '5px 10px', 
            borderRadius: '4px',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ color: 'var(--text-muted)' }}>🕒</span>
            <span>{utcTime}</span>
          </div>

          {/* Sound / Ambient Music Toggle */}
          <button 
            className="cyber-btn"
            style={{ 
              padding: '5px 10px', 
              fontSize: '0.72rem',
              borderColor: !isMuted ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)' 
            }}
            onClick={handleAudioToggle}
            title={isMuted ? (t.audioOn || 'Música Ambiental ON') : (t.audioOff || 'Música Ambiental OFF')}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} color="var(--accent-cyan)" />}
            <span className="font-mono" style={{ fontSize: '0.68rem', color: !isMuted ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
              {!isMuted ? 'MÚSICA' : 'MUTED'}
            </span>
          </button>

          {/* Language Switcher */}
          <button 
            className="cyber-btn"
            style={{ padding: '5px 10px', fontSize: '0.72rem' }}
            onClick={() => {
              soundEngine.playClick()
              setLang(lang === 'es' ? 'en' : 'es')
            }}
            title="Switch Language"
          >
            <Globe2 size={12} />
            <span className="font-mono">{lang.toUpperCase()}</span>
          </button>

          {/* Mission Field Manual & Guide Button */}
          <button 
            className="cyber-btn cyber-btn-primary"
            style={{ padding: '5px 14px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => {
              soundEngine.playClick()
              onOpenJudging()
            }}
            title={lang === 'es' ? 'Manual de Campo y Guía Científica' : 'Field Manual & Science Guide'}
          >
            <BookOpen size={13} />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: '1.1' }}>
              <span style={{ fontWeight: 700 }}>MANUAL DE MISIÓN</span>
              <span style={{ fontSize: '0.62rem', color: 'var(--accent-cyan)', opacity: 0.85 }}>Guía de Campo</span>
            </div>
            <ChevronRight size={13} style={{ marginLeft: '2px' }} />
          </button>
        </div>

        {/* Right: Stepped Scroll Progress Tracker */}
        <div className="hud-scroll-tracker">
          <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
            RECORRIDO EN SCROLL ACTIVO
          </span>

          {/* Progress Rail with 5 Dots */}
          <div className="hud-progress-rail">
            <div 
              className="hud-progress-fill" 
              style={{ width: `${currentStep.pct}%` }} 
            />
            <div className="hud-progress-dots">
              {[
                { st: 1, id: 'story' },
                { st: 2, id: 'observatory' },
                { st: 3, id: 'spectroscopy' },
                { st: 4, id: 'belts3d' },
                { st: 5, id: 'irsa' }
              ].map(({ st, id }) => (
                <div 
                  key={st} 
                  className={`hud-progress-dot ${currentStep.idx >= st ? 'active' : ''}`}
                  onClick={() => {
                    soundEngine.playClick()
                    if (setActiveTab) {
                      setActiveTab(id)
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  title={`Paso ${st}: ${id}`}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>

          {/* Step and Percentage readout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              PASO {currentStep.idx}/5
            </span>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: '#ffffff', opacity: 0.75 }}>
              {currentStep.pct}%
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
