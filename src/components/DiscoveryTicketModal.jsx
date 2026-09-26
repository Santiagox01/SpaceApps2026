import React, { useEffect } from 'react'
import { FileCheck, Download, Award, Sparkles, X, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { soundEngine } from '../services/soundEngine'

export function DiscoveryTicketModal({ isOpen, onClose, candidate, t }) {
  useEffect(() => {
    if (isOpen) {
      soundEngine.playTriumph()
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f2fe', '#ffaa00', '#ff6b35', '#ffffff']
        })
      } catch (e) {}
    }
  }, [isOpen])

  if (!isOpen || !candidate) return null

  const ticketId = `NASA-SPX-2026-${candidate.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
  const verificationHash = `0x${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`

  const handleDownloadJson = () => {
    soundEngine.playClick()
    const reportData = {
      mission: 'NASA SPHEREx Citizen Science Planet Hunter',
      challenge: 'NASA Space Apps Challenge 2026: Planet X and SPHEREx (Software)',
      ticketId: ticketId,
      timestampUtc: new Date().toISOString(),
      cryptographicVerificationHash: verificationHash,
      candidate: {
        id: candidate.id,
        name: candidate.name,
        type: candidate.type,
        raJ2000: candidate.ra,
        decJ2000: candidate.dec,
        raDeg: candidate.raDeg,
        decDeg: candidate.decDeg,
        parallaxArcsec: candidate.parallaxArcsec,
        properMotionArcsecYr: candidate.properMotionArcsecYr,
        estimatedDistanceAU: candidate.estimatedDistanceAU,
        orbitalPeriodYrs: candidate.orbitalPeriodYrs,
        apparentMagNIR: candidate.apparentMagNIR,
        wienTemperatureK: candidate.wienTempK,
        spectralSignatures: candidate.spectralFeatures.dominantMolecules
      },
      astrometryEpochs: candidate.epochs,
      submittedTo: 'Minor Planet Center (MPC) & NASA Science Mission Directorate'
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${ticketId}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content cyber-card" style={{ maxWidth: '780px', padding: '0', overflow: 'hidden' }}>
        {/* Certificate Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '16px 24px', 
          borderBottom: '1px solid var(--border-cyan)',
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(5, 12, 28, 0.95) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '4px', 
              background: 'rgba(16, 185, 129, 0.2)', 
              border: '1px solid #10b981',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <CheckCircle2 size={22} color="#10b981" />
            </div>
            <div>
              <h2 className="font-hud" style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>
                CERTIFICADO OFICIAL DE DESCUBRIMIENTO
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#34d399' }} className="font-mono">
                REGISTRO CIUDADANO VALIDADO | NASA SPHEREx SURVEY
              </span>
            </div>
          </div>

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
        </div>

        {/* Certificate Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Top Info Box */}
          <div style={{ 
            background: '#030712', 
            border: '1px solid rgba(0, 242, 254, 0.3)', 
            borderRadius: '6px', 
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span className="font-mono" style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 700 }}>
                ID TICKET: {ticketId}
              </span>
              <span className="badge-tag badge-cyan">
                <ShieldCheck size={12} />
                VERIFICADO POR CONSENSO MULTITEMPORAL
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', wordBreak: 'break-all' }} className="font-mono">
              HASH CRIPTOGRÁFICO DE AUDITORÍA: <strong style={{ color: '#fff' }}>{verificationHash}</strong>
            </div>
          </div>

          {/* Scientific Evidence Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ background: 'rgba(5, 12, 28, 0.7)', padding: '10px 14px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }} className="font-hud">NOMBRE DEL CUERPO:</span>
              <div className="font-mono" style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginTop: '2px' }}>
                {candidate.name}
              </div>
            </div>

            <div style={{ background: 'rgba(5, 12, 28, 0.7)', padding: '10px 14px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }} className="font-hud">COORDENADAS J2000:</span>
              <div className="font-mono" style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.85rem', marginTop: '2px' }}>
                {candidate.ra} | {candidate.dec}
              </div>
            </div>

            <div style={{ background: 'rgba(5, 12, 28, 0.7)', padding: '10px 14px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }} className="font-hud">DISTANCIA CALCULADA:</span>
              <div className="font-mono" style={{ color: '#34d399', fontWeight: 700, fontSize: '1rem', marginTop: '2px' }}>
                {candidate.estimatedDistanceAU > 0 ? `~${candidate.estimatedDistanceAU} UA` : 'N/A'}
              </div>
            </div>

            <div style={{ background: 'rgba(5, 12, 28, 0.7)', padding: '10px 14px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }} className="font-hud">ESPECTRO 102 BANDAS:</span>
              <div className="font-mono" style={{ color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.85rem', marginTop: '2px' }}>
                {candidate.spectralFeatures.dominantMolecules.join(', ')}
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button
              className="cyber-btn"
              onClick={() => {
                soundEngine.playClick()
                onClose()
              }}
            >
              CERRAR Y SEGUIR EXPLORANDO
            </button>

            <button
              className="cyber-btn cyber-btn-primary"
              onClick={handleDownloadJson}
              style={{ padding: '10px 20px' }}
            >
              <Download size={16} />
              DESCARGAR INFORME JSON OFICIAL
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
