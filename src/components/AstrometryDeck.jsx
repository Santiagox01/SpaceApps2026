import React from 'react'
import { 
  Orbit, 
  CheckCircle, 
  ShieldAlert,
  Compass
} from 'lucide-react'
import { soundEngine } from '../services/soundEngine'

export function AstrometryDeck({
  candidate,
  t,
  lang = 'es',
  isProMode,
  onValidateCandidate,
  onDismissCandidate
}) {
  const desc = candidate.description[lang] || candidate.description.es || candidate.description.en

  return (
    <div className="cyber-card" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '4px', 
            background: 'rgba(0, 240, 255, 0.12)', 
            border: '1px solid var(--accent-cyan)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--accent-cyan)',
            boxShadow: '0 0 14px rgba(0, 240, 255, 0.2)'
          }}>
            <Orbit size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.05rem', margin: 0, color: '#ffffff', fontWeight: 600 }}>
                {t.astrometryTitle}
              </h3>
              <span className="badge-tag badge-cyan" style={{ fontSize: '0.62rem' }}>
                <span className="radar-dot" style={{ width: '4px', height: '4px' }} />
                TELEMETRÍA ORBITAL
              </span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }} className="font-mono">
              SISTEMA ICRS J2000 | LÍNEA BASE SEMESTRAL SPHEREx (2.0 UA)
            </span>
          </div>
        </div>

        <span className={`badge-tag ${candidate.type === 'artifact_cosmic_ray' ? 'badge-red' : 'badge-cyan'}`} style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
          {candidate.badge}
        </span>
      </div>

      {/* Grid of Measurements with Aerospace HUD Card Frames */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
        gap: '12px' 
      }}>
        {/* Right Ascension */}
        <div style={{ 
          background: 'rgba(5, 11, 25, 0.8)', 
          padding: '12px 14px', 
          borderRadius: '4px', 
          border: '1px solid rgba(0, 240, 255, 0.18)',
          boxShadow: 'inset 0 0 10px rgba(0, 240, 255, 0.04)'
        }}>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }} className="font-mono">
            SYS_RA // {t.coordRa}
          </div>
          <div className="font-mono" style={{ fontSize: '1.02rem', color: '#fff', fontWeight: 600, marginTop: '4px', letterSpacing: '0.02em' }}>
            {candidate.ra}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', marginTop: '2px' }} className="font-mono">
            {candidate.raDeg}°
          </div>
        </div>

        {/* Declination */}
        <div style={{ 
          background: 'rgba(5, 11, 25, 0.8)', 
          padding: '12px 14px', 
          borderRadius: '4px', 
          border: '1px solid rgba(0, 240, 255, 0.18)',
          boxShadow: 'inset 0 0 10px rgba(0, 240, 255, 0.04)'
        }}>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }} className="font-mono">
            SYS_DEC // {t.coordDec}
          </div>
          <div className="font-mono" style={{ fontSize: '1.02rem', color: '#fff', fontWeight: 600, marginTop: '4px', letterSpacing: '0.02em' }}>
            {candidate.dec}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', marginTop: '2px' }} className="font-mono">
            {candidate.decDeg}°
          </div>
        </div>

        {/* Parallax Angle */}
        <div style={{ 
          background: 'rgba(5, 11, 25, 0.8)', 
          padding: '12px 14px', 
          borderRadius: '4px', 
          border: '1px solid rgba(0, 240, 255, 0.28)',
          boxShadow: 'inset 0 0 12px rgba(0, 240, 255, 0.06)'
        }}>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }} className="font-mono">
            PARALLAX // {t.parallaxAngle}
          </div>
          <div className="font-mono" style={{ fontSize: '1.05rem', color: 'var(--accent-cyan)', fontWeight: 600, marginTop: '4px', textShadow: '0 0 10px rgba(0, 240, 255, 0.4)' }}>
            {candidate.parallaxArcsec > 0 ? `${candidate.parallaxArcsec} "` : '0.00 " (Estático)'}
          </div>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)', marginTop: '2px' }} className="font-mono">
            Línea base: 1.0 UA (Tierra-Sol)
          </div>
        </div>

        {/* Proper Motion */}
        <div style={{ 
          background: 'rgba(5, 11, 25, 0.8)', 
          padding: '12px 14px', 
          borderRadius: '4px', 
          border: '1px solid rgba(255, 107, 53, 0.28)',
          boxShadow: 'inset 0 0 12px rgba(255, 107, 53, 0.06)'
        }}>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }} className="font-mono">
            PROPER_MOTION // {t.properMotion}
          </div>
          <div className="font-mono" style={{ fontSize: '1.05rem', color: 'var(--accent-infrared)', fontWeight: 600, marginTop: '4px', textShadow: '0 0 10px rgba(255, 107, 53, 0.4)' }}>
            {candidate.properMotionArcsecYr} "/año
          </div>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)', marginTop: '2px' }} className="font-mono">
            Deriva semestral
          </div>
        </div>

        {/* Heliocentric Distance */}
        <div style={{ 
          background: 'rgba(5, 11, 25, 0.8)', 
          padding: '12px 14px', 
          borderRadius: '4px', 
          border: '1px solid rgba(0, 255, 157, 0.28)',
          boxShadow: 'inset 0 0 12px rgba(0, 255, 157, 0.06)'
        }}>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }} className="font-mono">
            ORBIT_AU // {t.estDistance}
          </div>
          <div className="font-mono" style={{ fontSize: '1.1rem', color: 'var(--accent-emerald)', fontWeight: 700, marginTop: '4px', textShadow: '0 0 10px rgba(0, 255, 157, 0.4)' }}>
            {candidate.estimatedDistanceAU > 0 ? `~${candidate.estimatedDistanceAU} UA` : 'N/A (Artefacto)'}
          </div>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)', marginTop: '2px' }} className="font-mono">
            {candidate.orbitalPeriodYrs > 0 ? `Período: ~${candidate.orbitalPeriodYrs.toLocaleString()} a` : 'Sin órbita kepleriana'}
          </div>
        </div>
      </div>

      {/* Target Description */}
      <div style={{ 
        background: 'rgba(2, 6, 16, 0.65)', 
        borderLeft: '3px solid var(--accent-cyan)', 
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        borderRight: '1px solid rgba(255, 255, 255, 0.04)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        padding: '12px 16px', 
        fontSize: '0.84rem', 
        lineHeight: '1.55',
        color: '#cbd5e1',
        borderRadius: '0 4px 4px 0'
      }}>
        {desc}
      </div>

      {/* Action Buttons: Validate Discovery vs Dismiss */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '4px' }}>
        <button
          className="cyber-btn cyber-btn-primary"
          style={{ flex: 1, padding: '10px 20px', justifyContent: 'center', fontSize: '0.86rem', letterSpacing: '0.05em' }}
          onClick={() => {
            soundEngine.playTriumph()
            onValidateCandidate(candidate)
          }}
        >
          <CheckCircle size={16} />
          <span>{t.confirmCandidate}</span>
        </button>

        <button
          className="cyber-btn"
          style={{ padding: '10px 18px', fontSize: '0.82rem', borderColor: 'rgba(255, 51, 102, 0.45)', color: '#ff6b8b' }}
          onClick={() => {
            soundEngine.playClick()
            onDismissCandidate(candidate)
          }}
        >
          <ShieldAlert size={16} />
          <span>{t.dismissArtifact}</span>
        </button>
      </div>
    </div>
  )
}
