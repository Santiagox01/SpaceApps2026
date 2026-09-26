import React, { useState } from 'react'
import { 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Telescope, 
  Activity, 
  ShieldAlert, 
  Database, 
  FileText,
  Search,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react'
import { soundEngine } from '../services/soundEngine'

export function FieldManualModal({ isOpen, onClose, t, lang = 'es' }) {
  const [activeCategory, setActiveCategory] = useState('detection')

  if (!isOpen) return null

  const categories = [
    { id: 'detection', label: lang === 'es' ? 'Detección Multitemporal' : 'Multitemporal Detection', icon: Telescope },
    { id: 'spectro', label: lang === 'es' ? 'Espectroscopía 102 Bandas' : '102-Band Spectroscopy', icon: Activity },
    { id: 'filtering', label: lang === 'es' ? 'Filtro de Falsos Positivos' : 'False Positives Filter', icon: ShieldAlert },
    { id: 'irsa', label: lang === 'es' ? 'Datos NASA IRSA TAP' : 'NASA IRSA TAP Data', icon: Database },
    { id: 'reporting', label: lang === 'es' ? 'Protocolo de Reporte JPL' : 'JPL Reporting Protocol', icon: FileText }
  ]

  const guides = {
    detection: [
      {
        code: 'PROT-01',
        title: lang === 'es' ? 'Comparador de Parpadeo (Blink Comparator)' : 'Blink Comparator Technique',
        badge: lang === 'es' ? 'MÉTODO TOMBAUGH' : 'TOMBAUGH METHOD',
        color: '#00f2fe',
        summary: lang === 'es'
          ? 'El método estándar para identificar objetos del Sistema Solar exterior consiste en alternar rítmicamente entre 3 épocas semestrales de observación de SPHEREx (Época 1: 0 meses, Época 2: +6 meses, Época 3: +12 meses). Un planeta o TNO verdadero mostrará un desplazamiento colineal continuo.'
          : 'The gold-standard method to identify outer Solar System objects alternates between 3 semiannual SPHEREx survey epochs (Epoch 1: 0m, Epoch 2: +6m, Epoch 3: +12m). A true moving planet exhibits consistent linear displacement.',
        formula: 'Δθ = μ · Δt + π_parallax · sin(λ_sun - λ_obj)',
        tips: lang === 'es'
          ? ['El Planeta Nueve se desplaza entre 0.8 y 2.2 arcosegundos por año.', 'La tasa de parpadeo recomendada es de 1.5 a 2.5 Hz.', 'Verifica la alineación en al menos 3 épocas antes de emitir un reporte.']
          : ['Planet Nine shifts between 0.8 and 2.2 arcsec per year.', 'Optimal blink frequency is 1.5 to 2.5 Hz.', 'Verify continuous trajectory across all 3 epochs before submission.']
      },
      {
        code: 'PROT-02',
        title: lang === 'es' ? 'Paralaje Heliocéntrico Trigonométrico' : 'Trigonometric Heliocentric Parallax',
        badge: lang === 'es' ? 'GEOMETRÍA ORBITAL' : 'ORBITAL GEOMETRY',
        color: '#38f9d7',
        summary: lang === 'es'
          ? 'A medida que la Tierra orbita el Sol con una línea base de 2.0 UA (diámetro orbital), los objetos a menos de 1,000 UA experimentan un vaivén aparente reflexivo respecto a las estrellas de fondo.'
          : 'As Earth orbits the Sun spanning a 2.0 AU orbital baseline, objects closer than 1,000 AU display apparent reflexive parallax against distant background stars.',
        formula: 'd (UA) = 1.0 / tan(p_rad) ≈ 206,265 / p (arcsec)',
        tips: lang === 'es'
          ? ['Un paralaje menor a 1.0 arcsec sitúa al candidato a más de 300 UA del Sol.', 'Permite discernir entre asteroides cercanos (NEOs) y planetas transneptunianos.']
          : ['Parallax under 1.0 arcsec places the candidate beyond 300 AU.', 'Distinguishes between fast near-Earth asteroids and distant trans-Neptunians.']
      }
    ],
    spectro: [
      {
        code: 'SPEC-01',
        title: lang === 'es' ? 'Firmas de Absorción de Metano (CH₄)' : 'Methane (CH₄) Absorption Signatures',
        badge: lang === 'es' ? 'ATMÓSFERA PLANETARIA' : 'PLANETARY ATMOSPHERE',
        color: '#a855f7',
        summary: lang === 'es'
          ? 'Las 102 bandas continuas de SPHEREx (0.75 a 5.0 µm) permiten detectar con extrema precisión las caídas de transmisión causadas por metano molecular a 1.66 µm y 3.3 µm, indicativo clave de atmósferas frías de gigantes helados.'
          : 'SPHEREx 102 continuous spectral channels (0.75 - 5.0 µm) detect molecular methane absorption drops at 1.66 µm and 3.3 µm, a definitive signature of cold giant atmospheres.',
        formula: 'Profundidad de Absorción: D = 1 - (F_banda / F_continuo) > 45%',
        tips: lang === 'es'
          ? ['El metano gaseoso no se condensa en objetos masivos de >5 masas terrestres.', 'Las estrellas frías de fondo no exhiben estas depresiones moleculares pronunciadas.']
          : ['Methane gas remains unthawed in massive worlds >5 Earth masses.', 'Background stars do not exhibit these distinct molecular absorption dips.']
      },
      {
        code: 'SPEC-02',
        title: lang === 'es' ? 'Firma Térmica & Ley de Wien' : 'Thermal Profile & Wien Displacement Law',
        badge: lang === 'es' ? 'RADIACIÓN INFRARROJA' : 'INFRARED RADIATION',
        color: '#ff6b35',
        summary: lang === 'es'
          ? 'A 400-800 UA del Sol, la radiación solar incidente es mínima. El calor primordial interno del Planeta Nueve produce una temperatura efectiva de equilibrio de 35 K a 50 K, con su pico espectral ubicado en el infrarrojo medio.'
          : 'At 400-800 AU from the Sun, solar irradiance is negligible. Internal primordial core heat sustains an effective temperature of 35 K to 50 K, peaking in mid-infrared wavelengths.',
        formula: 'λ_max = b / T_eff ≈ 2898 µm·K / 42 K ≈ 69 µm (flujo ascendente 3-5 µm)',
        tips: lang === 'es'
          ? ['Los asteroides rocosos reflejan luz solar en visible; los planetas gigantes emiten calor infrarrojo.', 'El ratio 4.5µm / 1.2µm es el biomarcador térmico principal.']
          : ['Rocky asteroids reflect optical sunlight; giant planets radiate infrared core heat.', 'The 4.5µm to 1.2µm ratio serves as primary thermal confirmation.']
      }
    ],
    filtering: [
      {
        code: 'FLTR-01',
        title: lang === 'es' ? 'Descarte de Rayos Cósmicos (Cosmic Rays)' : 'Cosmic Ray Strike Filtering',
        badge: lang === 'es' ? 'ARTEFACTO INSTRUMENTAL' : 'INSTRUMENTAL ARTIFACT',
        color: '#ef4444',
        summary: lang === 'es'
          ? 'Partículas cargadas de alta energía atraviesan los detectores HgCdTe de SPHEREx saturando píxeles individuales con bordes extremadamente agudos, careciendo de la función de dispersión de punto (PSF) óptica del telescopio.'
          : 'High-energy galactic cosmic rays penetrate SPHEREx HgCdTe detectors, depositing charge into isolated pixels without the Gaussian Point Spread Function (PSF) of optics.',
        formula: 'PSF FWHM: Si FWHM < 1.0 píxel o desaparece en Época 2 = RAYO CÓSMICO (Descartar)',
        tips: lang === 'es'
          ? ['Un rayo cósmico aparece en solo 1 de las 3 épocas.', 'Haz clic en "Descartar Artefacto" para purificar el catálogo de la misión.', 'No genera curva de luz ni espectro continuo multiespectral.']
          : ['A cosmic ray appears in exactly 1 epoch only.', 'Click "Dismiss Artifact" to sanitize the mission catalog.', 'Lacks multitemporal orbital trajectory.']
      },
      {
        code: 'FLTR-02',
        title: lang === 'es' ? 'Trazas de Satélites en Órbita Baja (LEO Glints)' : 'Low Earth Orbit (LEO) Satellite Trails',
        badge: lang === 'es' ? 'CONTAMINACIÓN ÓRBITAL' : 'ORBITAL GLINT',
        color: '#ffaa00',
        summary: lang === 'es'
          ? 'Mega-constelaciones de satélites terrestres pueden cruzar el campo de visión produciendo trazos luminosos lineares en exposiciones individuales, pero no persisten en pases semestrales repetidos.'
          : 'Satellite mega-constellations passing through field-of-view produce elongated streaks in single exposures, but do not reappear in subsequent survey passes.',
        formula: 'Excentricidad de perfil: e > 0.85 en una sola exposición = Descartar',
        tips: lang === 'es'
          ? ['SPHEREx filtra el 99.2% mediante procesamiento en tierra en el IPAC.', 'Los artefactos residuales son fácilmente reconocibles por los ojos humanos.']
          : ['SPHEREx ground pipelines filter 99.2% at IPAC.', 'Remaining residual glitches are readily identified by citizen eyes.']
      }
    ],
    irsa: [
      {
        code: 'IRSA-01',
        title: lang === 'es' ? 'Consultas IVOA TAP con ADQL' : 'IVOA TAP Protocol with ADQL',
        badge: lang === 'es' ? 'DATOS CALTECH / NASA' : 'CALTECH / NASA DATA',
        color: '#00ff9d',
        summary: lang === 'es'
          ? 'El protocolo oficial IVOA TAP permite lanzar consultas astronómicas estandarizadas en lenguaje ADQL (Astronomical Data Query Language) contra el catálogo público de SPHEREx alojado en el IPAC de Caltech.'
          : 'The official IVOA TAP protocol executes standardized Astronomical Data Query Language (ADQL) queries against the SPHEREx public catalog hosted at Caltech IPAC.',
        formula: 'SELECT TOP 10 ra, dec, flux_band102 FROM spherex.artifact WHERE snr > 5.0',
        tips: lang === 'es'
          ? ['Endpoint en vivo: https://irsa.ipac.caltech.edu/TAP', 'Soporta filtrado por coordenadas espaciales con la función CONTAINS(POINT(), CIRCLE()).']
          : ['Live endpoint: https://irsa.ipac.caltech.edu/TAP', 'Supports spatial cone searches via CONTAINS(POINT(), CIRCLE()).']
      },
      {
        code: 'IRSA-02',
        title: lang === 'es' ? 'Inspección de Metadatos de Cabecera FITS' : 'FITS Standard Header Metadata',
        badge: lang === 'es' ? 'ESTÁNDAR IAU FITS-3' : 'IAU FITS-3 STANDARD',
        color: '#38bdf8',
        summary: lang === 'es'
          ? 'Los archivos científicos de SPHEREx utilizan el estándar astronómico Flexible Image Transport System (FITS) de Nivel 3, con calibración WCS astrométrica y fotométrica embebida en cabeceras legibles.'
          : 'SPHEREx scientific data releases employ Level-3 Flexible Image Transport System (FITS) standard, embedding calibrated WCS astrometry and photometry.',
        formula: 'Cabeceras Clave: CRVAL1, CRVAL2, CDELT1, CDELT2, BUNIT = "MJy/sr"',
        tips: lang === 'es'
          ? ['Verifica siempre la calibración absoluta en megajanskys por estereorradián (MJy/sr).', 'Garantiza repetibilidad científica para observatorios terrestres como Keck o VLT.']
          : ['Always check absolute calibration in megajanskys per steradian (MJy/sr).', 'Ensures scientific reproducibility for follow-up by Keck, Subaru, or VLT.']
      }
    ],
    reporting: [
      {
        code: 'JPL-01',
        title: lang === 'es' ? 'Emisión de Ticket de Descubrimiento Oficial' : 'Official Discovery Ticket Submission',
        badge: lang === 'es' ? 'CONFIRMACIÓN OFICIAL' : 'OFFICIAL DISCOVERY',
        color: '#ffaa00',
        summary: lang === 'es'
          ? 'Cuando un candidato supera la validación multitemporal (3 épocas continuas) y la firma espectroscópica infrarroja (absorción de CH4 > 40%), se emite un certificado criptográfico con firma de hash SHA-256 para seguimiento prioritario en observatorios mayores.'
          : 'When a candidate passes multitemporal trajectory confirmation (3 continuous epochs) and infrared spectral absorption criteria (CH4 > 40%), a cryptographic ticket with SHA-256 hash is generated for priority follow-up.',
        formula: 'Score Científico = (SNR / 5.0) · (1.0 + Probabilidad_Órbita) · 100',
        tips: lang === 'es'
          ? ['Descarga el ticket en formato JSON / Texto para remitirlo al Minor Planet Center (MPC).', 'Tu nombre quedará registrado en la base de datos comunitaria de SPHERExplorer.']
          : ['Download the report in JSON/Text format to submit to the Minor Planet Center (MPC).', 'Your citizen investigator credentials will be permanently attributed.']
      }
    ]
  }

  const currentItems = guides[activeCategory] || []

  return (
    <div className="modal-overlay" style={{ zIndex: 100 }}>
      <div 
        className="modal-content cyber-card" 
        style={{ 
          maxWidth: '960px', 
          width: '95%',
          padding: '0', 
          overflow: 'hidden',
          border: '1px solid rgba(0, 242, 254, 0.35)',
          background: 'rgba(5, 9, 20, 0.96)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 242, 254, 0.15)'
        }}
      >
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '18px 24px', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(10, 16, 32, 0.85)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '6px', 
              background: 'rgba(0, 242, 254, 0.12)', 
              border: '1px solid var(--accent-cyan)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--accent-cyan)'
            }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="font-hud" style={{ fontSize: '1.25rem', color: '#fff', margin: 0, letterSpacing: '0.04em' }}>
                {lang === 'es' ? 'Manual de Campo & Protocolos Científicos' : 'Mission Field Manual & Science Guide'}
              </h2>
              <span style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)' }} className="font-mono">
                {lang === 'es' ? 'Misión NASA SPHEREx • Guía de Detección de Objetos Transneptunianos' : 'NASA SPHEREx Mission • Trans-Neptunian Object Detection Guide'}
              </span>
            </div>
          </div>

          <button 
            className="cyber-btn"
            style={{ padding: '6px 10px', borderRadius: '4px' }}
            onClick={() => {
              soundEngine.playClick()
              onClose()
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation Categories */}
        <div style={{ 
          display: 'flex', 
          gap: '6px', 
          padding: '10px 20px', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(7, 12, 24, 0.95)',
          overflowX: 'auto'
        }}>
          {categories.map(cat => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playClick()
                  setActiveCategory(cat.id)
                }}
                className={`cyber-btn ${isActive ? 'cyber-btn-primary' : ''}`}
                style={{ 
                  padding: '6px 14px', 
                  fontSize: '0.78rem',
                  whiteSpace: 'nowrap',
                  background: isActive ? 'rgba(0, 242, 254, 0.2)' : 'transparent',
                  borderColor: isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.1)',
                  color: isActive ? '#00f2fe' : 'var(--text-muted)'
                }}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Guide Content Cards */}
        <div style={{ 
          padding: '24px', 
          maxHeight: '68vh', 
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px' 
        }}>
          {currentItems.map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: 'rgba(12, 18, 34, 0.75)', 
                border: `1px solid ${item.color}35`, 
                borderRadius: '8px', 
                padding: '18px 20px',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              className="cyber-card"
            >
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '4px', 
                height: '100%', 
                background: item.color 
              }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="font-mono" style={{ color: item.color, fontWeight: 700, fontSize: '0.85rem' }}>
                    {item.code}
                  </span>
                  <h3 className="font-hud" style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>
                    {item.title}
                  </h3>
                </div>

                <span className="badge-tag" style={{ 
                  background: `${item.color}15`, 
                  borderColor: `${item.color}60`, 
                  color: item.color,
                  fontSize: '0.68rem',
                  padding: '3px 8px'
                }}>
                  <CheckCircle2 size={11} />
                  {item.badge}
                </span>
              </div>

              <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: '#cbd5e1', margin: '0 0 12px 0' }}>
                {item.summary}
              </p>

              {/* Math / Formula Box */}
              {item.formula && (
                <div style={{ 
                  background: 'rgba(0, 0, 0, 0.45)', 
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  padding: '8px 14px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Zap size={14} color={item.color} />
                  <span className="font-mono" style={{ fontSize: '0.78rem', color: item.color }}>
                    {item.formula}
                  </span>
                </div>
              )}

              {/* Tips & Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
                  {lang === 'es' ? 'CRITERIOS CLAVE DE INSPECCIÓN:' : 'KEY INSPECTION CRITERIA:'}
                </span>
                <ul style={{ margin: '4px 0 0 16px', padding: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {item.tips.map((tip, tIdx) => (
                    <li key={tIdx} style={{ marginBottom: '3px' }}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div style={{ 
          padding: '12px 24px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
          background: 'rgba(8, 13, 26, 0.95)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <span className="font-mono">
            {lang === 'es' ? 'SPHERExplorer v2.4 • Manual Operativo de Ciencia Ciudadana' : 'SPHERExplorer v2.4 • Citizen Science Operational Manual'}
          </span>
          <button 
            className="cyber-btn cyber-btn-primary"
            style={{ padding: '6px 14px', fontSize: '0.75rem' }}
            onClick={() => {
              soundEngine.playClick()
              onClose()
            }}
          >
            {lang === 'es' ? 'Entendido / Continuar Exploración' : 'Understood / Continue Exploration'}
          </button>
        </div>
      </div>
    </div>
  )
}
