import React, { useState, useMemo } from 'react'
import { 
  Activity, 
  Flame, 
  Droplets, 
  Layers, 
  Sparkles,
  Info
} from 'lucide-react'
import { generate102BandsSpectrum } from '../data/candidates'
import { soundEngine } from '../services/soundEngine'

export function SpectroscopyHUD({ candidate, t, isProMode }) {
  const [activeFilter, setActiveFilter] = useState('all') // 'all' | 'methane' | 'water'
  const [hoveredBand, setHoveredBand] = useState(null)

  // Generate 102 bands for the active candidate
  const bands = useMemo(() => {
    return generate102BandsSpectrum(candidate)
  }, [candidate])

  // SVG Chart bounds
  const svgW = 740
  const svgH = 180
  const padding = { top: 20, right: 25, bottom: 30, left: 40 }
  const graphW = svgW - padding.left - padding.right
  const graphH = svgH - padding.top - padding.bottom

  // Min and max
  const minWl = 0.75
  const maxWl = 5.00
  const maxFlux = Math.max(...bands.map(b => b.flux), 2.5)

  // Coordinate mapping
  const getX = (wl) => padding.left + ((wl - minWl) / (maxWl - minWl)) * graphW
  const getY = (flux) => padding.top + (1 - flux / maxFlux) * graphH

  // Generate SVG path string
  const pathD = useMemo(() => {
    return bands.map((b, i) => {
      const x = getX(b.wavelength)
      const y = getY(b.flux)
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    }).join(' ')
  }, [bands, maxFlux])

  // Area under curve path
  const areaD = useMemo(() => {
    const bottomY = padding.top + graphH
    return `${pathD} L ${padding.left + graphW} ${bottomY} L ${padding.left} ${bottomY} Z`
  }, [pathD, graphW, graphH])

  return (
    <div className="cyber-card" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '4px', 
            background: 'rgba(255, 107, 53, 0.12)', 
            border: '1px solid var(--accent-infrared)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--accent-infrared)',
            boxShadow: '0 0 14px rgba(255, 107, 53, 0.25)'
          }}>
            <Activity size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.05rem', margin: 0, color: '#ffffff', fontWeight: 600 }}>
                {t.spectroscopyTitle}
              </h3>
              <span className="badge-tag badge-orange" style={{ fontSize: '0.62rem' }}>
                <span className="radar-dot-orange" style={{ width: '4px', height: '4px' }} />
                102 CANALES CONTINUOS
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)' }} className="font-mono">
              FOTOMETRÍA ESPECTRAL R~40-100 | RESOLUCIÓN 0.75 - 5.0 µm
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            className={`cyber-btn ${activeFilter === 'all' ? 'cyber-btn-primary' : ''}`}
            style={{ padding: '5px 12px', fontSize: '0.74rem' }}
            onClick={() => {
              soundEngine.playClick()
              setActiveFilter('all')
            }}
          >
            <Layers size={12} />
            <span>{t.filterAll}</span>
          </button>

          <button
            className={`cyber-btn ${activeFilter === 'methane' ? 'cyber-btn-orange' : ''}`}
            style={{ padding: '5px 12px', fontSize: '0.74rem' }}
            onClick={() => {
              soundEngine.playClick()
              setActiveFilter('methane')
            }}
          >
            <Flame size={12} />
            <span>{t.filterMethane}</span>
          </button>

          <button
            className={`cyber-btn ${activeFilter === 'water' ? 'cyber-btn-primary' : ''}`}
            style={{ padding: '5px 12px', fontSize: '0.74rem' }}
            onClick={() => {
              soundEngine.playClick()
              setActiveFilter('water')
            }}
          >
            <Droplets size={12} />
            <span>{t.filterWater}</span>
          </button>
        </div>
      </div>

      {/* SVG Spectrum Visualizer with Aerospace Grid */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        background: 'rgba(3, 7, 16, 0.92)', 
        borderRadius: '4px', 
        border: '1px solid rgba(0, 240, 255, 0.2)', 
        padding: '10px 0 6px 0',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
      }}>
        <svg 
          viewBox={`0 0 ${svgW} ${svgH}`} 
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="35%" stopColor="#34d399" />
              <stop offset="65%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
            <linearGradient id="spectrumArea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.2)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.0)" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.5, 1.0, 1.5, 2.0].map((fl) => (
            <g key={fl}>
              <line 
                x1={padding.left} 
                y1={getY(fl)} 
                x2={padding.left + graphW} 
                y2={getY(fl)} 
                stroke="rgba(255, 255, 255, 0.06)" 
                strokeDasharray="2,2"
              />
              <text 
                x={padding.left - 6} 
                y={getY(fl) + 3} 
                fill="#64748b" 
                fontSize="9" 
                fontFamily="Space Mono" 
                textAnchor="end"
              >
                {fl.toFixed(1)}
              </text>
            </g>
          ))}

          {/* X Axis Wavelength Ticks */}
          {[1.0, 2.0, 3.0, 4.0, 5.0].map((wl) => (
            <g key={wl}>
              <line 
                x1={getX(wl)} 
                y1={padding.top} 
                x2={getX(wl)} 
                y2={padding.top + graphH} 
                stroke="rgba(255, 255, 255, 0.06)" 
              />
              <text 
                x={getX(wl)} 
                y={padding.top + graphH + 16} 
                fill="#64748b" 
                fontSize="9" 
                fontFamily="Space Mono" 
                textAnchor="middle"
              >
                {wl.toFixed(1)} µm
              </text>
            </g>
          ))}

          {/* Methane Highlight Regions */}
          {activeFilter === 'methane' && candidate.spectralFeatures.methaneBands.map((dip, i) => (
            <g key={`ch4-${i}`}>
              <rect 
                x={getX(dip - 0.15)} 
                y={padding.top} 
                width={getX(dip + 0.15) - getX(dip - 0.15)} 
                height={graphH} 
                fill="rgba(251, 146, 60, 0.15)"
                stroke="rgba(251, 146, 60, 0.5)"
                strokeDasharray="3,3"
              />
              <text 
                x={getX(dip)} 
                y={padding.top + 14} 
                fill="#fb923c" 
                fontSize="9" 
                fontFamily="Space Mono" 
                textAnchor="middle" 
                fontWeight="700"
              >
                CH₄ ({dip}µm)
              </text>
            </g>
          ))}

          {/* Water Ice Highlight Regions */}
          {activeFilter === 'water' && candidate.spectralFeatures.waterIceBands.map((dip, i) => (
            <g key={`h2o-${i}`}>
              <rect 
                x={getX(dip - 0.18)} 
                y={padding.top} 
                width={getX(dip + 0.18) - getX(dip - 0.18)} 
                height={graphH} 
                fill="rgba(56, 189, 248, 0.15)"
                stroke="rgba(56, 189, 248, 0.5)"
                strokeDasharray="3,3"
              />
              <text 
                x={getX(dip)} 
                y={padding.top + 14} 
                fill="#38bdf8" 
                fontSize="9" 
                fontFamily="Space Mono" 
                textAnchor="middle" 
                fontWeight="700"
              >
                H₂O ({dip}µm)
              </text>
            </g>
          ))}

          {/* Area Fill */}
          <path d={areaD} fill="url(#spectrumArea)" />

          {/* Continuous Spectral Line */}
          <path 
            d={pathD} 
            fill="none" 
            stroke="url(#spectrumGradient)" 
            strokeWidth="2.4" 
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.65))' }}
          />

          {/* Interactive Data Points (Hover Probe) */}
          {bands.map((b) => {
            const cx = getX(b.wavelength)
            const cy = getY(b.flux)
            const isHovered = hoveredBand && hoveredBand.bandIndex === b.bandIndex

            return (
              <circle
                key={b.bandIndex}
                cx={cx}
                cy={cy}
                r={isHovered ? 5 : 2}
                fill={isHovered ? '#ffffff' : '#38bdf8'}
                stroke={isHovered ? '#fb923c' : 'none'}
                strokeWidth="2"
                style={{ cursor: 'pointer', transition: 'r 0.15s' }}
                onMouseEnter={() => setHoveredBand(b)}
              />
            )
          })}
        </svg>

        {/* Floating Tooltip info */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '6px 16px', 
          background: 'rgba(5, 8, 16, 0.95)', 
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.74rem',
          fontFamily: 'var(--font-mono)'
        }}>
          <div>
            {hoveredBand ? (
              <span style={{ color: 'var(--accent-cyan)' }}>
                BANDA #{hoveredBand.bandIndex} | λ = {hoveredBand.wavelength.toFixed(3)} µm | FLUJO = {hoveredBand.flux.toFixed(3)} MJy/sr
              </span>
            ) : (
              <span style={{ color: 'var(--text-muted)' }}>
                Pasa el cursor sobre la curva para inspeccionar la fotometría de los 102 canales
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--text-muted)' }}>
              {t.wienTemp}
            </span>
            <span style={{ color: candidate.wienTempK > 0 ? 'var(--accent-amber)' : 'var(--text-muted)', fontWeight: 600 }}>
              {candidate.wienTempK > 0 ? `${candidate.wienTempK} K (${(candidate.wienTempK - 273.15).toFixed(0)}°C)` : 'N/A (No térmico)'}
            </span>
          </div>
        </div>
      </div>

      {/* Atmospheric Molecular Tags */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          FIRMAS MOLECULARES IDENTIFICADAS:
        </span>
        {candidate.spectralFeatures.dominantMolecules.map((mol, idx) => (
          <span key={idx} className="badge-tag badge-orange" style={{ fontSize: '0.66rem' }}>
            <Sparkles size={10} />
            {mol}
          </span>
        ))}
      </div>
    </div>
  )
}
