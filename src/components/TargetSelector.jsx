import React from 'react'
import { CANDIDATES } from '../data/candidates'
import { soundEngine } from '../services/soundEngine'
import { Radio, Crosshair, Target, CheckCircle2 } from 'lucide-react'

export function TargetSelector({ activeCandidate, onSelectCandidate, t }) {
  return (
    <div className="cyber-card" style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={14} color="var(--accent-cyan)" />
          <span style={{ fontSize: '0.76rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            {t.targetCatalogTitle}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="radar-dot"></span>
          <span style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)' }} className="font-mono">
            CALTECH/IPAC RECONNAISSANCE (P1-P3)
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {CANDIDATES.map(cand => {
          const isSelected = cand.id === activeCandidate.id
          let badgeColor = 'badge-cyan'
          let tagText = cand.type.toUpperCase()
          let accentBorder = 'rgba(0, 240, 255, 0.45)'

          if (cand.type === 'planet_nine') {
            badgeColor = 'badge-orange'
            tagText = '★ PLANETA 9'
            accentBorder = 'rgba(255, 107, 53, 0.55)'
          } else if (cand.type === 'brown_dwarf') {
            badgeColor = 'badge-purple'
            tagText = 'ENANA MARRÓN'
            accentBorder = 'rgba(168, 85, 247, 0.55)'
          } else if (cand.type === 'artifact_cosmic_ray') {
            badgeColor = 'badge-red'
            tagText = '⚠ RAYO CÓSMICO'
            accentBorder = 'rgba(255, 51, 102, 0.55)'
          } else if (cand.type === 'trans_neptunian') {
            badgeColor = 'badge-cyan'
            tagText = 'TNO / SEDNOIDE'
            accentBorder = 'rgba(0, 240, 255, 0.55)'
          }

          return (
            <button
              key={cand.id}
              onClick={() => {
                soundEngine.playClick()
                onSelectCandidate(cand)
              }}
              style={{
                position: 'relative',
                background: isSelected 
                  ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.16) 0%, rgba(5, 12, 28, 0.95) 100%)' 
                  : 'rgba(5, 10, 22, 0.65)',
                border: `1px solid ${isSelected ? accentBorder : 'rgba(255, 255, 255, 0.08)'}`,
                boxShadow: isSelected ? '0 0 18px rgba(0, 240, 255, 0.22), inset 0 0 10px rgba(0, 240, 255, 0.08)' : 'none',
                borderRadius: '4px',
                padding: '10px 14px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                outline: 'none',
                overflow: 'hidden'
              }}
              className="target-selector-btn"
            >
              {/* Corner Notch when active */}
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '6px',
                  height: '6px',
                  background: 'var(--accent-cyan)',
                  boxShadow: '0 0 6px var(--accent-cyan)'
                }} />
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.78rem', color: isSelected ? '#ffffff' : '#cbd5e1', fontWeight: 700, letterSpacing: '0.02em' }}>
                  {cand.name}
                </span>
                {isSelected ? (
                  <span className="radar-dot"></span>
                ) : (
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                <span className={`badge-tag ${badgeColor}`} style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                  {tagText}
                </span>
                <span style={{ fontSize: '0.7rem', color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)' }} className="font-mono">
                  {cand.estimatedDistanceAU > 0 ? `${cand.estimatedDistanceAU} UA` : 'ARTEFACTO'}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
