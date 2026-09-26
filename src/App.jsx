import React, { useState, useEffect } from 'react'
import { HeroGateway } from './components/HeroGateway'
import { KuiperBelts3D } from './components/KuiperBelts3D'
import { Navbar } from './components/Navbar'
import { TelescopeHUD } from './components/TelescopeHUD'
import { SpectroscopyHUD } from './components/SpectroscopyHUD'
import { AstrometryDeck } from './components/AstrometryDeck'
import { TargetSelector } from './components/TargetSelector'
import { NarrativePrologue } from './components/NarrativePrologue'
import { IrsaTapModal } from './components/IrsaTapModal'
import { FieldManualModal } from './components/FieldManualModal'
import { DiscoveryTicketModal } from './components/DiscoveryTicketModal'

import { CANDIDATES } from './data/candidates'
import { TRANSLATIONS } from './data/translations'
import { soundEngine } from './services/soundEngine'
import { 
  Orbit, 
  Sparkles, 
  Home, 
  Telescope, 
  ArrowRight, 
  ArrowDown, 
  Activity, 
  Database, 
  BookOpen, 
  Compass,
  Layers,
  ChevronDown
} from 'lucide-react'

export function App() {
  const [lang, setLang] = useState('es')
  const [activeCandidate, setActiveCandidate] = useState(CANDIDATES[0])
  const [isMuted, setIsMuted] = useState(true)
  const [isProMode, setIsProMode] = useState(false)

  // Primary view: 'hero' | 'app'
  const [viewState, setViewState] = useState('hero')

  // Top navigation active section: 'story' | 'observatory' | 'spectroscopy' | 'belts3d' | 'irsa'
  const [activeTab, setActiveTab] = useState('story')

  // Modals
  const [isJudgingOpen, setIsJudgingOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)

  const t = TRANSLATIONS[lang]

  // Handlers for Hero Gateway
  const handleStartCompleteJourney = () => {
    soundEngine.playTriumph()
    setViewState('app')
    setActiveTab('story')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenObservatory = () => {
    soundEngine.playClick()
    setViewState('app')
    setActiveTab('observatory')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpen3DBelts = () => {
    soundEngine.playClick()
    setViewState('app')
    setActiveTab('belts3d')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenIrsa = () => {
    soundEngine.playClick()
    setViewState('app')
    setActiveTab('irsa')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleValidateCandidate = (cand) => {
    if (cand.type === 'artifact_cosmic_ray') {
      alert(lang === 'es' 
        ? '¡Atención! Este objeto es un impacto de rayo cósmico en el detector (artefacto). No posee movimiento orbital continuo entre épocas.' 
        : 'Warning! This object is an instrumental cosmic ray hit (artifact), not a true moving planet.')
      return
    }
    setIsReportOpen(true)
  }

  const handleDismissCandidate = (cand) => {
    if (cand.type === 'artifact_cosmic_ray') {
      soundEngine.playTriumph()
      alert(lang === 'es' 
        ? '¡Excelente análisis astrofísico! Has identificado y filtrado correctamente un impacto de rayo cósmico instrumental.' 
        : 'Outstanding astrophysical inspection! You correctly classified and filtered out an instrumental cosmic ray strike.')
    } else {
      alert(lang === 'es' 
        ? 'Nota: Este objeto presenta firmas reales de absorción infrarroja y desplazamiento retrógrado. Verifica el espectro de 102 bandas.' 
        : 'Note: This target exhibits legitimate infrared absorption and orbital shift. Review the 102-band spectrum.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: '#ffffff', position: 'relative' }}>
      {/* VIEW 1: HERO GATEWAY (Monumental cinematic portal) */}
      {viewState === 'hero' && (
        <HeroGateway
          onStartCompleteJourney={handleStartCompleteJourney}
          onOpenObservatory={handleOpenObservatory}
          onOpen3DBelts={handleOpen3DBelts}
          onOpenJudging={() => setIsJudgingOpen(true)}
          onOpenIrsa={handleOpenIrsa}
          lang={lang}
          setLang={setLang}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
      )}

      {/* VIEW 2: MISSION CONTROL APPLICATION */}
      {viewState === 'app' && (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Top Sticky Aerospace Navbar */}
          <Navbar
            lang={lang}
            setLang={setLang}
            t={t}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            isProMode={isProMode}
            setIsProMode={setIsProMode}
            activeTab={activeTab}
            setActiveTab={(tabId) => {
              setActiveTab(tabId)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onGoHero={() => {
              setViewState('hero')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onOpenJudging={() => setIsJudgingOpen(true)}
          />

          {/* Quick Mission Telemetry Bar */}
          <div style={{ 
            background: 'rgba(4, 7, 16, 0.94)', 
            borderBottom: '1px solid rgba(0, 240, 255, 0.12)',
            padding: '7px 24px', 
            position: 'sticky',
            top: '96px',
            zIndex: 40,
            backdropFilter: 'blur(12px)'
          }}>
            <div style={{ 
              maxWidth: '1720px', 
              margin: '0 auto', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              gap: '10px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  className="cyber-btn"
                  style={{ padding: '3px 9px', fontSize: '0.72rem' }}
                  onClick={() => {
                    soundEngine.playClick()
                    setViewState('hero')
                  }}
                >
                  <Home size={11} />
                  <span>INICIO / PORTADA</span>
                </button>

                <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>/</span>

                <span className="font-mono" style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 600 }}>
                  {activeTab === 'story' && '1. EXPEDIENTE & NARRATIVA'}
                  {activeTab === 'observatory' && '2. OBSERVATORIO TEMPORAL'}
                  {activeTab === 'spectroscopy' && '3. ESPECTROSCOPÍA (102 BANDAS)'}
                  {activeTab === 'belts3d' && '4. SIMULADOR DE ÓRBITAS (A Y B)'}
                  {activeTab === 'irsa' && '5. ARCHIVO REAL NASA IRSA'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge-tag badge-cyan" style={{ fontSize: '0.65rem' }}>
                  <span className="radar-dot"></span>
                  {activeTab === 'story' ? 'RECORRIDO EN SCROLL (4 ACTOS)' : 'MODO CONTROL DE MISIÓN'}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================================
              TAB 1: EXPEDIENTE & NARRATIVA (SCROLL CONTINUO DE LOS 4 ACTOS)
              ================================================================= */}
          {activeTab === 'story' && (
            <section id="story" className="mission-section celestial-prologue-bg" style={{ padding: '40px 24px 70px 24px', position: 'relative' }}>
              {/* Giant Planet Limb in the Background */}
              <div className="celestial-planet-limb" />

              {/* Left Technical Watermark */}
              <div style={{ position: 'absolute', top: '24px', left: '28px', pointerEvents: 'none', opacity: 0.65, zIndex: 4 }} className="font-mono">
                <div style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.12em' }}>SPHEREx</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--accent-cyan)', letterSpacing: '0.08em' }}>ALL-SKY SURVEY</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>INFRARED SPECTROSCOPY</div>
                <div style={{ width: '22px', height: '2px', background: 'var(--accent-cyan)', marginTop: '4px' }}></div>
              </div>

              {/* Right Astronomical Coordinates */}
              <div style={{ position: 'absolute', top: '24px', right: '28px', pointerEvents: 'none', opacity: 0.75, textAlign: 'right', zIndex: 4 }} className="font-mono">
                <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>RA &nbsp; <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>23h 44m 12.3s</span></div>
                <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>DEC <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>-15° 32' 44.1"</span></div>
                <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>DIST <span style={{ color: '#ffffff', fontWeight: 600 }}>~ ??? AU</span></div>
                <div style={{ fontSize: '0.66rem', color: 'var(--accent-orange)' }}>OBJ &nbsp; <span style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>PLANET X (CANDIDATE)</span></div>
              </div>

              <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span className="badge-tag badge-cyan" style={{ fontSize: '0.72rem', padding: '4px 14px' }}>
                      <BookOpen size={13} />
                      01 // BRIEFING CIENTÍFICO OBLIGATORIO
                    </span>
                  </div>
                  <h2 className="anim-text-reveal font-display" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: '#ffffff', margin: '0 0 10px 0', fontWeight: 800, letterSpacing: '-0.02em' }}>
                    Expediente: <span style={{ background: 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 45%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.45))' }}>Planeta X</span>
                  </h2>
                  <p className="anim-subtitle-slide" style={{ maxWidth: '780px', margin: '0 auto', fontSize: '0.98rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                    ¿Por qué la humanidad busca el noveno planeta y por qué la IA no puede hacerlo sola?
                  </p>
                </div>

                {/* Interactive 4-Act Story Narrative */}
                <NarrativePrologue 
                  isOpen={true} 
                  isEmbedded={true}
                  lang={lang} 
                  t={t} 
                  onStartHunting={() => {
                    setActiveTab('observatory')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                />

                {/* Guided Transition to Tab 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '36px', gap: '10px' }}>
                  <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', letterSpacing: '0.15em' }}>
                    SIGUIENTE FASE
                  </span>
                  <button
                    className="cyber-btn cyber-btn-primary anim-glow-pulse"
                    style={{ padding: '12px 28px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => {
                      soundEngine.playClick()
                      setActiveTab('observatory')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    <span>PASO 2: ABRIR OBSERVATORIO Y COMPARADOR BLINK</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* =================================================================
              TAB 2: OBSERVATORIO TEMPORAL (COMPARADOR DE PARPADEO)
              ================================================================= */}
          {activeTab === 'observatory' && (
            <section id="observatory" className="mission-section" style={{ padding: '40px 24px 60px 24px' }}>
              <div style={{ maxWidth: '1680px', margin: '0 auto' }}>
                {/* Section Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '14px', marginBottom: '22px' }}>
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className="badge-tag badge-orange">
                        <Telescope size={12} />
                        02 / COMPARADOR DE PARPADEO MULTITEMPORAL
                      </span>
                    </div>
                    <h2 className="anim-text-reveal" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                      {t.tabObservatory}
                    </h2>
                    <p className="anim-subtitle-slide" style={{ margin: '4px 0 0 0', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                      {lang === 'es' 
                        ? 'Alterna entre los pases semestrales P1 (Jun 2025), P2 (Dic 2025) y P3 (Jun 2026) para detectar el desplazamiento retrógrado del Planeta Nueve.'
                        : 'Blink between semiannual survey passes P1, P2, and P3 to detect the retrograde shift of Planet Nine.'}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="cyber-btn"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      onClick={() => {
                        setActiveTab('spectroscopy')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    >
                      <Activity size={12} />
                      <span>IR A ESPECTROSCOPÍA &gt;</span>
                    </button>
                  </div>
                </div>

                {/* Main Observatory Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)', gap: '16px', alignItems: 'start' }}>
                  {/* Left Column: Telescope HUD + Target Selector */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <TelescopeHUD 
                      candidate={activeCandidate}
                      t={t}
                      isProMode={isProMode}
                      onCandidateLocked={(cand) => {
                        // Candidate locked on HUD
                      }}
                    />

                    <TargetSelector 
                      activeCandidate={activeCandidate}
                      onSelectCandidate={setActiveCandidate}
                      t={t}
                    />
                  </div>

                  {/* Right Column: Astrometry Deck + Spectroscopy Summary */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <AstrometryDeck 
                      candidate={activeCandidate}
                      t={t}
                      lang={lang}
                      isProMode={isProMode}
                      onValidateCandidate={handleValidateCandidate}
                      onDismissCandidate={handleDismissCandidate}
                    />

                    {/* Compact Spectroscopy Quick Preview */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }} className="font-mono">
                          ESPECTRO INFRARROJO DE 102 CANALES:
                        </span>
                        <button 
                          className="cyber-btn"
                          style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                          onClick={() => {
                            setActiveTab('spectroscopy')
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                        >
                          <Activity size={11} />
                          <span>VER LABORATORIO COMPLETO &gt;</span>
                        </button>
                      </div>

                      <SpectroscopyHUD 
                        candidate={activeCandidate}
                        t={t}
                        isProMode={isProMode}
                      />
                    </div>
                  </div>
                </div>

                {/* Guided Transition to Tab 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '36px', gap: '10px' }}>
                  <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-orange)', letterSpacing: '0.15em' }}>
                    SIGUIENTE FASE
                  </span>
                  <button
                    className="cyber-btn cyber-btn-primary anim-glow-pulse"
                    style={{ padding: '12px 28px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => {
                      soundEngine.playClick()
                      setActiveTab('spectroscopy')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    <span>PASO 3: ANALIZAR ESPECTRO DE 102 BANDAS</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* =================================================================
              TAB 3: ESPECTROSCOPÍA INFRARROJA (102 BANDAS)
              ================================================================= */}
          {activeTab === 'spectroscopy' && (
            <section id="spectroscopy" className="mission-section" style={{ padding: '40px 24px 60px 24px' }}>
              <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge-tag badge-cyan">
                      <Activity size={12} />
                      03 / LABORATORIO DE ESPECTROSCOPÍA MOLECULAR
                    </span>
                  </div>
                  <h2 className="anim-text-reveal" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                    {t.spectroscopyTitle}
                  </h2>
                  <p className="anim-subtitle-slide" style={{ maxWidth: '780px', margin: '6px auto 0 auto', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {t.spectroscopyDesc}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <TargetSelector 
                    activeCandidate={activeCandidate}
                    onSelectCandidate={setActiveCandidate}
                    t={t}
                  />

                  <SpectroscopyHUD 
                    candidate={activeCandidate}
                    t={t}
                    isProMode={isProMode}
                  />

                  {/* Science Interpretation Cards */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '16px',
                    marginTop: '6px' 
                  }}>
                    <div className="cyber-card" style={{ padding: '20px' }}>
                      <h4 style={{ fontSize: '0.92rem', color: 'var(--accent-infrared)', marginBottom: '8px', fontWeight: 600 }}>
                        Filtro de Metano ($CH_4$ a 1.66, 2.32, 3.31 µm)
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                        Los mundos gigantes gaseosos y helados fríos retienen abundante metano atmosférico que absorbe fuertemente la luz infrarroja en estas bandas, creando caídas de flujo características que no existen en estrellas normales.
                      </p>
                    </div>

                    <div className="cyber-card" style={{ padding: '20px' }}>
                      <h4 style={{ fontSize: '0.92rem', color: 'var(--accent-cyan)', marginBottom: '8px', fontWeight: 600 }}>
                        Filtro de Hielo de Agua ($H_2O$ a 1.5, 2.0, 3.1 µm)
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                        Los objetos del Cinturón de Kuiper y el hipotético Planeta Nueve poseen cortezas o mantos ricos en hielos volátiles. SPHEREx detecta la absorción cristalina de agua helada a temperaturas inferiores a 50 Kelvin.
                      </p>
                    </div>

                    <div className="cyber-card" style={{ padding: '20px' }}>
                      <h4 style={{ fontSize: '0.92rem', color: 'var(--accent-emerald)', marginBottom: '8px', fontWeight: 600 }}>
                        Ley de Desplazamiento de Wien
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                        λ_max · T = 2898 µm·K. Un planeta a ~44 Kelvin tiene su pico de emisión térmica en torno a los 3.8 a 4.5 µm, exactamente dentro del detector de longitud de onda larga de SPHEREx.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guided Transition to Tab 4 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '36px', gap: '10px' }}>
                  <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-purple)', letterSpacing: '0.15em' }}>
                    SIGUIENTE FASE
                  </span>
                  <button
                    className="cyber-btn anim-glow-pulse"
                    style={{ padding: '12px 28px', fontSize: '0.88rem', borderColor: 'var(--accent-purple)', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => {
                      soundEngine.playClick()
                      setActiveTab('belts3d')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    <span>PASO 4: SIMULADOR DINÁMICO 3D (A Y B)</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* =================================================================
              TAB 4: SIMULADOR DINÁMICO 3D (CINTURÓN DE KUIPER & SATÉLITE)
              ================================================================= */}
          {activeTab === 'belts3d' && (
            <section id="belts3d" className="mission-section" style={{ padding: '40px 24px 60px 24px' }}>
              <div style={{ maxWidth: '1680px', margin: '0 auto' }}>
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge-tag badge-purple">
                      <Orbit size={12} />
                      04 / SIMULADOR DINÁMICO DE ÓRBITAS TRIDIMENSIONALES
                    </span>
                  </div>
                  <h2 className="anim-text-reveal" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                    {t.tabBelts3D}
                  </h2>
                  <p className="anim-subtitle-slide" style={{ maxWidth: '750px', margin: '6px auto 0 auto', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {lang === 'es'
                      ? 'Órbita A: Agrupamiento gravitacional del Planeta Nueve a 500 UA | Órbita B: SPHEREx en el terminador polar a 700 km con escudo solar.'
                      : 'Orbit A: Planet Nine gravitational clustering at 500 AU | Orbit B: SPHEREx polar terminator orbit at 700 km.'}
                  </p>
                </div>

                {/* 3D Visualizer Component */}
                <KuiperBelts3D 
                  onBackToDashboard={() => {
                    setActiveTab('observatory')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  onSelectCandidate={(cand) => {
                    setActiveCandidate(cand)
                    setActiveTab('observatory')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  t={t}
                />

                {/* Guided Transition to Tab 5 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '36px', gap: '10px' }}>
                  <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', letterSpacing: '0.15em' }}>
                    SIGUIENTE FASE
                  </span>
                  <button
                    className="cyber-btn anim-glow-pulse"
                    style={{ padding: '12px 28px', fontSize: '0.88rem', borderColor: 'var(--accent-emerald)', color: '#34d399', display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => {
                      soundEngine.playClick()
                      setActiveTab('irsa')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    <span>PASO 5: CONSOLA NASA IRSA TAP</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* =================================================================
              TAB 5: CONSOLA DE DATOS NASA IRSA TAP & ARCHIVO FITS
              ================================================================= */}
          {activeTab === 'irsa' && (
            <section id="irsa" className="mission-section" style={{ padding: '40px 24px 80px 24px' }}>
              <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge-tag badge-emerald">
                      <Database size={12} />
                      05 / CONSOLA IVOA TAP & ARCHIVO CIENTÍFICO CALTECH/IPAC
                    </span>
                  </div>
                  <h2 className="anim-text-reveal" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                    {t.tabIrsa}
                  </h2>
                  <p className="anim-subtitle-slide" style={{ maxWidth: '780px', margin: '6px auto 0 auto', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {lang === 'es'
                      ? 'Conexión oficial con el protocolo IVOA TAP de NASA/IPAC IRSA (irsa.ipac.caltech.edu/TAP). Ejecuta consultas ADQL e inspecciona metadatos FITS.'
                      : 'Official IVOA TAP protocol connection to NASA/IPAC IRSA. Execute ADQL queries and inspect standard Level-3 FITS headers.'}
                  </p>
                </div>

                <IrsaTapModal 
                  isOpen={true} 
                  isEmbedded={true}
                  onClose={() => {
                    setActiveTab('observatory')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }} 
                  t={t} 
                />
              </div>
            </section>
          )}

          {/* Aerospace Footer */}
          <footer style={{ 
            background: 'rgba(5, 8, 16, 0.95)', 
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '24px 32px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="font-display" style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                SPHEREx PLANET HUNTER
              </span>
              <span className="badge-tag badge-cyan">NASA SPACE APPS 2026</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '640px' }}>
              Plataforma de ciencia ciudadana para el relevamiento multitemporal del telescopio espacial SPHEREx (0.75-5.0 µm) en búsqueda del Planeta Nueve y objetos del Cinturón de Kuiper.
            </div>
            <button
              className="cyber-btn"
              style={{ padding: '6px 14px', fontSize: '0.75rem', marginTop: '6px' }}
              onClick={() => {
                setActiveTab('story')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <span>↑ VOLVER AL EXPEDIENTE NARRATIVO</span>
            </button>
          </footer>
        </div>
      )}

      {/* MODALS */}
      <FieldManualModal 
        isOpen={isJudgingOpen} 
        onClose={() => setIsJudgingOpen(false)} 
        t={t} 
        lang={lang}
      />

      <DiscoveryTicketModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
        candidate={activeCandidate} 
        t={t} 
      />
    </div>
  )
}
