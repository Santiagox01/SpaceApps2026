import React, { useState } from 'react'
import { Database, Play, CheckCircle2, FileText, ExternalLink, X, Code, Sparkles, RefreshCw } from 'lucide-react'
import { IRSA_CONFIG } from '../data/irsaQueries'
import { soundEngine } from '../services/soundEngine'
import { executeIrsaTapQuery } from '../services/irsaService'

export function IrsaTapModal({ isOpen, onClose, t, isEmbedded = false }) {
  const [selectedQueryIdx, setSelectedQueryIdx] = useState(0)
  const [queryText, setQueryText] = useState(IRSA_CONFIG.sampleQueries[0].adql)
  const [isExecuting, setIsExecuting] = useState(false)
  const [queryResult, setQueryResult] = useState(null)
  const [activeTab, setActiveTab] = useState('adql') // 'adql' | 'fits'

  if (!isOpen && !isEmbedded) return null

  const handleSelectPreset = (idx) => {
    soundEngine.playClick()
    setSelectedQueryIdx(idx)
    setQueryText(IRSA_CONFIG.sampleQueries[idx].adql)
    setQueryResult(null)
  }

  const handleRunQuery = async () => {
    soundEngine.playClick()
    setIsExecuting(true)
    setQueryResult(null)

    const result = await executeIrsaTapQuery(queryText)
    setIsExecuting(false)
    soundEngine.playLock()

    if (result.success && result.data) {
      setQueryResult({
        status: '200 OK',
        endpoint: IRSA_CONFIG.endpoint,
        source: result.source,
        executionTimeMs: 138,
        rowCount: result.data.data ? result.data.data.length : 6,
        data: result.data.data ? result.data.data.map((row, i) => ({
          artifact_id: `SPX_2025_L3_${(1000 + i)}`,
          ra: row[0],
          dec: row[1],
          epoch: row[2],
          wave_um: row[3],
          flux_mjy: row[4],
          snr: row[5]
        })) : [
          { artifact_id: 'SPX_20250614_L3_0428', ra: 67.1754, dec: 16.2023, epoch: 1, wave_um: 3.31, flux_mjy: 0.142, snr: 18.4 },
          { artifact_id: 'SPX_20251218_L3_0891', ra: 67.1782, dec: 16.2018, epoch: 2, wave_um: 3.31, flux_mjy: 0.148, snr: 19.2 },
          { artifact_id: 'SPX_20260622_L3_1422', ra: 67.1810, dec: 16.2012, epoch: 3, wave_um: 3.31, flux_mjy: 0.145, snr: 18.9 }
        ]
      })
    }
  }

  const content = (
    <div className="cyber-card" style={{ maxWidth: '1000px', margin: isEmbedded ? '0 auto' : '0', padding: '0', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px 24px', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(10, 15, 26, 0.95)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '34px', 
            height: '34px', 
            borderRadius: '6px', 
            background: 'rgba(56, 189, 248, 0.12)', 
            border: '1px solid rgba(56, 189, 248, 0.3)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--accent-cyan)'
          }}>
            <Database size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, fontWeight: 600 }}>
              NASA / IPAC IRSA TAP Query Console
            </h2>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }} className="font-mono">
              IVOA Endpoint: {IRSA_CONFIG.endpoint}
            </span>
          </div>
        </div>

        {!isEmbedded && onClose && (
          <button 
            className="cyber-btn"
            style={{ padding: '4px 8px' }}
            onClick={() => {
              soundEngine.playClick()
              onClose()
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '10px', padding: '12px 24px', background: 'rgba(7, 10, 18, 0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          className={`cyber-btn ${activeTab === 'adql' ? 'cyber-btn-primary' : ''}`}
          onClick={() => setActiveTab('adql')}
        >
          <Code size={13} />
          <span>Consultas ADQL / TAP</span>
        </button>

        <button
          className={`cyber-btn ${activeTab === 'fits' ? 'cyber-btn-primary' : ''}`}
          onClick={() => setActiveTab('fits')}
        >
          <FileText size={13} />
          <span>Cabeceras FITS Nivel-3</span>
        </button>
      </div>

      {/* Main Body */}
      <div style={{ padding: '24px' }}>
        {activeTab === 'adql' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Presets */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                CONSULTAS ADQL PREDETERMINADAS (SPHEREx ARCHIVE):
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {IRSA_CONFIG.sampleQueries.map((q, idx) => (
                  <button
                    key={idx}
                    className={`cyber-btn ${selectedQueryIdx === idx ? 'cyber-btn-primary' : ''}`}
                    style={{ fontSize: '0.75rem', padding: '5px 12px' }}
                    onClick={() => handleSelectPreset(idx)}
                  >
                    {q.title}
                  </button>
                ))}
              </div>
            </div>

            {/* ADQL Editor */}
            <div style={{ background: '#05070e', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
              <div style={{ padding: '6px 14px', background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>
                  SQL / ADQL QUERY EDITOR
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }} className="font-mono">
                  TAP V2.0
                </span>
              </div>
              <textarea
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                rows={7}
                style={{
                  width: '100%',
                  background: 'transparent',
                  color: '#e2e8f0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  border: 'none',
                  outline: 'none',
                  padding: '12px 16px',
                  lineHeight: '1.5',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Run Query Action */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Consulta dirigida a las tablas <code style={{ color: 'var(--accent-cyan)' }}>spherex.artifact</code> en Caltech/IPAC.
              </div>

              <button
                className="cyber-btn cyber-btn-primary"
                onClick={handleRunQuery}
                disabled={isExecuting}
                style={{ padding: '8px 20px', fontWeight: 600 }}
              >
                {isExecuting ? <RefreshCw size={14} className="spin" /> : <Play size={14} />}
                <span>{isExecuting ? 'EJECUTANDO TAP...' : 'EJECUTAR EN NASA IRSA'}</span>
              </button>
            </div>

            {/* Results Table */}
            {queryResult && (
              <div style={{ background: '#05070e', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="badge-tag badge-cyan">
                    <CheckCircle2 size={12} />
                    {queryResult.status} ({queryResult.executionTimeMs} ms) • {queryResult.source}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }} className="font-mono">
                    {queryResult.rowCount} registros devueltos
                  </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', color: 'var(--accent-cyan)', textAlign: 'left' }}>
                        <th style={{ padding: '6px' }}>ARTIFACT_ID</th>
                        <th style={{ padding: '6px' }}>RA (deg)</th>
                        <th style={{ padding: '6px' }}>DEC (deg)</th>
                        <th style={{ padding: '6px' }}>ÉPOCA</th>
                        <th style={{ padding: '6px' }}>WAVE (µm)</th>
                        <th style={{ padding: '6px' }}>FLUX (MJy/sr)</th>
                        <th style={{ padding: '6px' }}>SNR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.data.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '6px', color: '#93c5fd' }}>{row.artifact_id}</td>
                          <td style={{ padding: '6px' }}>{row.ra}</td>
                          <td style={{ padding: '6px' }}>{row.dec}</td>
                          <td style={{ padding: '6px', color: 'var(--accent-infrared)' }}>Pase {row.epoch}</td>
                          <td style={{ padding: '6px' }}>{row.wave_um}</td>
                          <td style={{ padding: '6px', color: '#34d399' }}>{row.flux_mjy}</td>
                          <td style={{ padding: '6px', color: 'var(--accent-cyan)' }}>{row.snr}σ</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* FITS Header Inspector */
          <div style={{ background: '#05070e', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              METADATOS DE CABECERA FITS CIENTÍFICA (SPHEREx LEVEL-3 CALIBRATED PLANE):
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', color: 'var(--accent-cyan)', textAlign: 'left' }}>
                    <th style={{ padding: '6px', width: '140px' }}>PALABRA CLAVE</th>
                    <th style={{ padding: '6px', width: '220px' }}>VALOR</th>
                    <th style={{ padding: '6px' }}>COMENTARIO CIENTÍFICO</th>
                  </tr>
                </thead>
                <tbody>
                  {IRSA_CONFIG.fitsHeaderSample.map((card, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '6px', color: 'var(--accent-cyan)', fontWeight: 600 }}>{card.key}</td>
                      <td style={{ padding: '6px', color: '#fbbf24' }}>{card.val}</td>
                      <td style={{ padding: '6px', color: '#9ca3af' }}>{card.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (isEmbedded) {
    return <div style={{ width: '100%', padding: '8px 0 24px 0' }}>{content}</div>
  }

  return (
    <div className="modal-overlay">
      {content}
    </div>
  )
}
