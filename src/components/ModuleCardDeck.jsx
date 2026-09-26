import React from 'react'
import { 
  Telescope, 
  Activity, 
  Orbit, 
  Layers, 
  Database, 
  Award, 
  BookOpen,
  ArrowRight, 
  Sparkles,
  Zap,
  Radio
} from 'lucide-react'
import { soundEngine } from '../services/soundEngine'

export function ModuleCardDeck({
  onSelectModule,
  onOpenJudging,
  onOpenIrsa,
  onOpen3DBelts,
  t
}) {
  const modules = [
    {
      id: 'blink',
      title: 'BLINK COMPARATOR',
      subtitle: 'Multi-Epoch Orbital Shift Detection',
      tag: '60 FPS CANVAS',
      badgeClass: 'badge-cyan',
      icon: Telescope,
      accentColor: '#00f0ff',
      description: 'Emula el mecanismo digital de Clyde Tombaugh a 0.5 - 6.0 Hz entre las épocas semestrales de SPHEREx para revelar objetos móviles.',
      action: () => onSelectModule('observatory', { viewMode: 'blink' })
    },
    {
      id: 'spectroscopy',
      title: '102-BAND SPECTROMETER',
      subtitle: 'Infrared Molecular Absorption',
      tag: '0.75 - 5.0 µm',
      badgeClass: 'badge-orange',
      icon: Activity,
      accentColor: '#ffaa00',
      description: 'Curva espectrofotométrica continua en 102 canales con filtros moleculares para metano (CH4), hielo de agua (H2O) y ley de Wien.',
      action: () => onSelectModule('observatory', { focus: 'spectroscopy' })
    },
    {
      id: 'belts',
      title: '3D ORBITAL SWARM',
      subtitle: 'Kuiper Belt & Planet Nine Orbits',
      tag: 'INTERACTIVE 3D',
      badgeClass: 'badge-purple',
      icon: Orbit,
      accentColor: '#a855f7',
      description: 'Simulador 3D en tiempo real del Sistema Solar exterior: el enjambre de TNOs, la órbita de Sedna y la trayectoria calculada del Planeta 9.',
      action: () => onOpen3DBelts()
    },
    {
      id: 'diff',
      title: 'PHOTOMETRIC SUBTRACTION',
      subtitle: 'Difference Imaging (I₂ - I₁)',
      tag: 'NOISE REDUCTION',
      badgeClass: 'badge-cyan',
      icon: Layers,
      accentColor: '#00f0ff',
      description: 'Sustracción de flujo pixel a pixel: las estrellas estáticas se anulan a negro absoluto y solo el cuerpo en movimiento resalta como dipolo.',
      action: () => onSelectModule('observatory', { viewMode: 'diff' })
    },
    {
      id: 'irsa',
      title: 'NASA IRSA TAP CONSOLE',
      subtitle: 'Caltech IVOA ADQL Queries',
      tag: 'REAL DATA PIPELINE',
      badgeClass: 'badge-cyan',
      icon: Database,
      accentColor: '#00ff88',
      description: 'Ejecutor de consultas astronómicas ADQL sobre las tablas spherex.artifact y visor de metadatos de cabecera estándar FITS Nivel-3.',
      action: () => onOpenIrsa()
    },
    {
      id: 'field_manual',
      title: 'MANUAL DE CAMPO Y GUÍA DE MISIÓN',
      subtitle: 'Protocolos de Detección SPHEREx',
      tag: 'GUÍA CIENTÍFICA',
      badgeClass: 'badge-cyan',
      icon: BookOpen,
      accentColor: '#00f2fe',
      description: 'Protocolos estandarizados de fotometría infrarroja de 102 bandas, cálculo de paralaje heliocéntrico, firmas de absorción molecular y descarte de rayos cósmicos.',
      action: () => onOpenJudging()
    }
  ]

  return (
    <div style={{ marginTop: '24px', marginBottom: '32px' }} className="deck-perspective-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', letterSpacing: '0.15em' }}>
            ● MISSION MODULES & INSTRUMENTATION
          </span>
          <h2 style={{ fontSize: '1.45rem', margin: '2px 0 0 0', color: '#ffffff', fontWeight: 600 }}>
            Plataforma de Inspección y Análisis
          </h2>
        </div>

        <span className="badge-tag badge-cyan">
          <Radio size={11} />
          6 MÓDULOS ACTIVOS
        </span>
      </div>

      {/* Grid of 3D Tilted Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '16px' 
      }}>
        {modules.map(mod => {
          const IconComp = mod.icon

          return (
            <div
              key={mod.id}
              className="tilted-3d-card"
              style={{
                padding: '20px 22px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '190px'
              }}
              onClick={() => {
                soundEngine.playClick()
                mod.action()
              }}
            >
              {/* Top Row: Icon & Tag */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '6px', 
                    background: 'rgba(0, 0, 0, 0.5)', 
                    border: `1px solid ${mod.accentColor}`,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: `0 0 14px ${mod.accentColor}44`
                  }}>
                    <IconComp size={18} color={mod.accentColor} />
                  </div>

                  <span className={`badge-tag ${mod.badgeClass}`} style={{ fontSize: '0.62rem' }}>
                    <span className="radar-dot" style={{ background: mod.accentColor }}></span>
                    {mod.tag}
                  </span>
                </div>

                {/* Titles */}
                <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '0.02em' }}>
                  {mod.title}
                </h3>
                <div className="font-mono" style={{ fontSize: '0.72rem', color: mod.accentColor, letterSpacing: '0.08em', marginBottom: '8px' }}>
                  {mod.subtitle}
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                  {mod.description}
                </p>
              </div>

              {/* Bottom Action Arrow */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '16px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  color: mod.accentColor, 
                  fontSize: '0.78rem', 
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  letterSpacing: '0.08em'
                }}>
                  ACCEDER AL MÓDULO <ArrowRight size={14} />
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
