import React, { useEffect, useRef, useState } from 'react'
import { 
  Sparkles, 
  Compass, 
  Telescope, 
  Eye, 
  Rocket, 
  CheckCircle2, 
  X, 
  Radio, 
  ArrowDown, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Orbit, 
  Globe2, 
  ChevronRight, 
  Target, 
  TrendingDown, 
  Snowflake, 
  Flame, 
  ShieldAlert, 
  FileCheck, 
  Play, 
  Home,
  BookOpen
} from 'lucide-react'
import { soundEngine } from '../services/soundEngine'

export function NarrativePrologue({ lang = 'es', t, isOpen, onClose, isEmbedded = false, onStartHunting }) {
  // References for all 4 interactive live canvases
  const canvasRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]
  const [activeActIndex, setActiveActIndex] = useState(0)

  // 4 Complete Scientific Acts Data Model (Split Cockpit format matching reference design)
  const acts = [
    {
      num: '01',
      id: 'act-01',
      tag: 'ANOMALÍA GRAVITACIONAL',
      shortTag: '01 ANOMALÍA',
      title: lang === 'es' 
        ? 'La Anomalía Gravitacional en la Oscuridad' 
        : 'The Gravitational Anomaly in the Dark',
      body: lang === 'es'
        ? 'En los confines helados más allá de Neptuno, un grupo de objetos transneptunianos extremos (Sedna, 2012 VP113) comparten una inusual alineación orbital y perihelio extrañamente alineado. Matemáticamente, la probabilidad de que esto sea casualidad es menor al 0.007%. Un planeta gigante helado, de 5 a 10 veces la masa de la Tierra, acecha a más de 450 Unidades Astronómicas.'
        : 'In the icy outskirts beyond Neptune, a cluster of extreme trans-Neptunian objects (Sedna, 2012 VP113) share an anomalous orbital alignment and clustered perihelia. Mathematically, random chance is under 0.007%. An undiscovered icy super-Earth of 5 to 10 Earth masses shepherds them from over 450 AU.',
      icon: Orbit,
      accent: '#00f0ff',
      cardClass: 'act-card-cyan',
      stageTitle: 'SISTEMA SOLAR EXTERNO',
      stageSubtitle: 'TRAYECTORIAS ORBITALES (VISTA INCLINADA)',
      fovScale: 'J2000 ECLIPTIC | FOV: 120° | SCALE: 50 AU',
      evidence: [
        {
          icon: Target,
          title: lang === 'es' ? 'Órbitas alineadas' : 'Clustered Orbits',
          desc: lang === 'es' ? 'Varios TNOs muestran perihelio y planos orbitales inusualmente alineados.' : 'Multiple extreme TNOs share clustered perihelia pointing in the same direction.'
        },
        {
          icon: TrendingDown,
          title: lang === 'es' ? 'Probabilidad baja' : 'Near-Zero Chance',
          desc: lang === 'es' ? 'La probabilidad de que esta alineación sea casual es < 0.007%.' : 'Statistical probability of random clustering is under 0.007%.'
        },
        {
          icon: Snowflake,
          title: lang === 'es' ? 'Planeta gigante helado' : 'Giant Icy World',
          desc: lang === 'es' ? 'Se estima una masa de 5 a 10 veces la Tierra, a > 450 UA del Sol.' : 'Estimated mass of 5-10 Earths with semi-major axis > 450 AU from the Sun.'
        }
      ],
      conclusionTitle: lang === 'es' ? 'Probabilidad de azar menor al 0.007%.' : 'Random chance lower than 0.007%.',
      conclusionDesc: lang === 'es' 
        ? 'Las órbitas de Sedna y los TNOs extremos apuntan hacia una masa invisible de 5 a 10 Tierras, pastoreando a ~450 UA.' 
        : 'Sedna and extreme TNO orbits physically dictate an unseen shepherd of 5-10 Earth masses at ~450 AU.',
      legend: [
        { label: lang === 'es' ? 'Órbita observada' : 'Observed orbit', color: '#c084fc', dash: false },
        { label: lang === 'es' ? 'Órbita estimada (Planeta X)' : 'Estimated orbit (Planet X)', color: '#fb923c', dash: true },
        { label: lang === 'es' ? 'Cinturón de Kuiper' : 'Kuiper Belt', color: '#64748b', dot: true },
        { label: lang === 'es' ? 'Planetas conocidos' : 'Known planets', color: '#ffffff', circle: true }
      ],
      coords: {
        ra: '23h 44m 12.3s',
        dec: "-15° 32' 44.1\"",
        dist: '~ 485 AU',
        obj: 'PLANET X (CANDIDATO)'
      }
    },
    {
      num: '02',
      id: 'act-02',
      tag: 'MISIÓN NASA SPHEREx',
      shortTag: '02 SPHEREx',
      title: lang === 'es' 
        ? 'El Escaneo Infrarrojo de Todo el Cielo' 
        : 'All-Sky Infrared Spectroscopic Survey',
      body: lang === 'es'
        ? 'A 450 UA, la luz del Sol es 200,000 veces más débil que en la Tierra. El Planeta Nueve es completamente invisible para telescopios ópticos convencionales. Sin embargo, SPHEREx no busca luz reflejada: cartografía el calor residual primordial de su formación (~40 Kelvin) a través de 102 canales infrarrojos continuos cada seis meses.'
        : 'At 450 AU, sunlight is 200,000 times weaker than on Earth. Planet Nine is virtually invisible in optical wavelengths. SPHEREx does not look for reflected sunlight: it maps the planet primordial thermal glow (~40 Kelvin) across 102 continuous near-infrared bands every 6 months.',
      icon: Telescope,
      accent: '#ff6b35',
      cardClass: 'act-card-orange',
      stageTitle: 'SONDEO ESPECTRAL SPHEREx',
      stageSubtitle: 'BARRIDO DE 102 BANDAS INFRARROJAS (0.75 - 5.0 µm)',
      fovScale: 'POLAR ORBIT 700 KM | FOV: 3.5° | RES: 6.2"',
      evidence: [
        {
          icon: Layers,
          title: lang === 'es' ? '102 Canales continuos' : '102 Spectral Bands',
          desc: lang === 'es' ? 'Resolución R~40-100 desde 0.75 hasta 5.0 µm sin puntos ciegos.' : 'Continuous spectroscopy spanning 0.75 to 5.0 microns without gaps.'
        },
        {
          icon: Globe2,
          title: lang === 'es' ? 'Órbita Heliosíncrona' : 'Sun-Synchronous Orbit',
          desc: lang === 'es' ? 'Órbita polar a 700 km en el terminador con detectores pasivos a 40 K.' : 'Polar 700 km orbit along terminator cooling optical payload to 40 K.'
        },
        {
          icon: Flame,
          title: lang === 'es' ? 'Firma Térmica Propia' : 'Primordial Core Heat',
          desc: lang === 'es' ? 'Brilla por radiación térmica interna según la Ley de Wien.' : 'Emits intrinsic infrared thermal radiation governed by Wien law.'
        }
      ],
      conclusionTitle: lang === 'es' ? 'Detección por calor propio a 40 Kelvin.' : 'Thermal detection at 40 Kelvin.',
      conclusionDesc: lang === 'es' 
        ? 'Donde la luz solar falla, la termodinámica triunfa: el Planeta Nueve no puede ocultar su emisión infrarroja a SPHEREx.' 
        : 'Where optical light fails, thermodynamics succeeds: Planet Nine cannot hide its infrared core radiation.',
      legend: [
        { label: lang === 'es' ? 'Haz infrarrojo de barrido' : 'Sweeping infrared beam', color: '#ff6b35', dash: false },
        { label: lang === 'es' ? 'Filtro de absorción CH4' : 'Methane absorption band', color: '#38bdf8', dash: true },
        { label: lang === 'es' ? 'Firmas moleculares' : 'Molecular signatures', color: '#fbbf24', dot: true }
      ],
      coords: {
        ra: '04h 28m 32.4s',
        dec: "+16° 12' 08.5\"",
        dist: '~ 420 AU',
        obj: 'SPHEREx TARGET FIELD'
      }
    },
    {
      num: '03',
      id: 'act-03',
      tag: 'COGNICIÓN HUMANA VS IA',
      shortTag: '03 COGNICIÓN IA',
      title: lang === 'es' 
        ? 'El Desafío Cognitivo: El Ojo Humano vs la Máquina' 
        : 'The Cognitive Challenge: Human Eyes vs AI Pipelines',
      body: lang === 'es'
        ? 'Los detectores espaciales reciben millones de impactos de partículas cargadas y rayos cósmicos. Las redes neuronales sufren alucinaciones y generan decenas de miles de falsos positivos en imágenes astronómicas individuales. Aquí es donde el cerebro humano supera a la IA: tu visión periférica detecta vectores orbitales continuos a lo largo de semestres en un parpadeo.'
        : 'Spaceborne arrays sustain millions of high-energy cosmic ray strikes. Machine learning pipelines hallucinate, producing tens of thousands of false positive triggers on single frames. Human pattern recognition excels here: citizen science eyes spot true multi-temporal collinear motion across survey epochs.',
      icon: Eye,
      accent: '#c084fc',
      cardClass: 'act-card-purple',
      stageTitle: 'MATRIZ DE DETECTOR HgCdTe',
      stageSubtitle: 'FILTRADO ESPACIAL DE RAYOS CÓSMICOS VS MOVIMIENTO KEPLERIANO',
      fovScale: 'MATRIZ 2048x2048 | SELECCIÓN FWHM | SNR > 5.0',
      evidence: [
        {
          icon: ShieldAlert,
          title: lang === 'es' ? 'Falsos Positivos IA' : 'AI False Positives',
          desc: lang === 'es' ? 'Los modelos confunden saturación de píxeles únicos con planetas.' : 'Algorithms misclassify single-pixel detector saturation as targets.'
        },
        {
          icon: Eye,
          title: lang === 'es' ? 'Visión Humana' : 'Human Intuition',
          desc: lang === 'es' ? 'El cerebro descarta artefactos sin trayectoria continua en 3 épocas.' : 'Human cortex filters non-repeating noise spikes across 3 epochs.'
        },
        {
          icon: Sparkles,
          title: lang === 'es' ? 'Método Tombaugh' : 'Tombaugh Blink Method',
          desc: lang === 'es' ? 'Alternancia rápida rítmica para amplificar el desplazamiento angular.' : 'Rhythmic blinking amplifies subtle angular motion against fixed stars.'
        }
      ],
      conclusionTitle: lang === 'es' ? 'El cerebro humano descarta el 99.8% del ruido.' : 'Human eye eliminates 99.8% of noise.',
      conclusionDesc: lang === 'es' 
        ? 'La ciencia ciudadana no es un juego: es el filtro de seguridad definitivo antes de destinar tiempo en telescopios de 10 metros.' 
        : 'Citizen science is the definitive verification filter before tasking billion-dollar ground observatories.',
      legend: [
        { label: lang === 'es' ? 'Rayo cósmico (Artefacto descartado)' : 'Cosmic ray (Discarded artifact)', color: '#ff3366', dot: true },
        { label: lang === 'es' ? 'Retícula de seguimiento humano' : 'Human tracking reticle', color: '#00f0ff', dash: true },
        { label: lang === 'es' ? 'Trayectoria colineal P1-P2-P3' : 'Collinear trajectory P1-P2-P3', color: '#c084fc', dash: false }
      ],
      coords: {
        ra: '12h 15m 44.0s',
        dec: "-04° 22' 19.3\"",
        dist: 'N/A (ARTEFACTO)',
        obj: 'COSMIC RAY HIT'
      }
    },
    {
      num: '04',
      id: 'act-04',
      tag: 'TU IMPACTO CIENTÍFICO',
      shortTag: '04 IMPACTO',
      title: lang === 'es' 
        ? 'De la Detección Ciudadana a la Historia Astronómica' 
        : 'From Citizen Discovery to the History of Science',
      body: lang === 'es'
        ? 'Cuando confirmas un candidato en SPHERExplorer, la telemetría WCS, la curva fotométrica de 102 bandas y las coordenadas ICRS J2000 se empaquetan en un Certificado Oficial de Descubrimiento con hash criptográfico SHA-256. Este expediente se remite al Minor Planet Center (MPC) y coordina seguimiento prioritario en observatorios como Keck, Subaru y el VLT.'
        : 'When you confirm a candidate in SPHERExplorer, calibrated WCS astrometry, 102-band photometry, and ICRS J2000 vectors compile into an Official Discovery Ticket secured by SHA-256 hash. This dossier coordinates priority observation campaigns with Keck, Subaru, and the Minor Planet Center.',
      icon: Globe2,
      accent: '#00ff9d',
      cardClass: 'act-card-emerald',
      stageTitle: 'RED DE SEGUIMIENTO CIENTÍFICO',
      stageSubtitle: 'MINOR PLANET CENTER (MPC) & JET PROPULSION LABORATORY (JPL)',
      fovScale: 'PROTOCOLO IAU | SEGUIMIENTO Keck/Subaru | HASH SHA-256',
      evidence: [
        {
          icon: FileCheck,
          title: lang === 'es' ? 'Ticket Criptográfico' : 'Cryptographic Ticket',
          desc: lang === 'es' ? 'Hash inmutable SHA-256 para auditoría de descubrimiento científico.' : 'Immutable SHA-256 verification hash certifying discovery telemetry.'
        },
        {
          icon: Telescope,
          title: lang === 'es' ? 'Red de Observatorios' : '10-Meter Telescopes',
          desc: lang === 'es' ? 'Puntos de mira automáticos para los telescopios Keck, Subaru y VLT.' : 'Automated target coordinates for Keck, Subaru, and ESO VLT follow-up.'
        },
        {
          icon: CheckCircle2,
          title: lang === 'es' ? 'Atribución Oficial' : 'Official Attribution',
          desc: lang === 'es' ? 'Tu nombre queda registrado formalmente en la historia astronómica.' : 'Your name is permanently archived in the official planetary catalog.'
        }
      ],
      conclusionTitle: lang === 'es' ? 'Certificación oficial para observatorios mayores.' : 'Official certification for major telescopes.',
      conclusionDesc: lang === 'es' 
        ? 'Tu análisis valida coordenadas astrométricas para la mayor búsqueda planetaria del siglo XXI.' 
        : 'Your inspection validates astrometric vectors for the greatest planetary hunt of the century.',
      legend: [
        { label: lang === 'es' ? 'Ficha oficial emitida' : 'Official ticket issued', color: '#00ff9d', circle: true },
        { label: lang === 'es' ? 'Vector de seguimiento Keck' : 'Keck follow-up vector', color: '#00f0ff', dash: true },
        { label: lang === 'es' ? 'Enlace de datos IPAC / IRSA' : 'IPAC/IRSA data bridge', color: '#fbbf24', dash: false }
      ],
      coords: {
        ra: '18h 42m 09.1s',
        dec: "-22° 18' 33.7\"",
        dist: '~ 485 AU',
        obj: 'VERIFIED DISCOVERY'
      }
    }
  ]

  // ScrollSpy to update active ribbon card as the user scrolls through the 4 acts
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = acts.findIndex(a => a.id === entry.target.id)
          if (idx !== -1) {
            setActiveActIndex(idx)
          }
        }
      })
    }, {
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.2
    })

    acts.forEach(a => {
      const el = document.getElementById(a.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // 60 FPS Render Loop for each Act Canvas
  useEffect(() => {
    let animationFrameId
    let time = 0

    const render = () => {
      time += 0.02

      // ==========================================
      // CANVAS 0: ACT 1 - Outer Solar System & Planet X
      // ==========================================
      const c1 = canvasRefs[0].current
      if (c1) {
        const ctx = c1.getContext('2d')
        const w = c1.width
        const h = c1.height
        const cx = w / 2
        const cy = h / 2

        ctx.fillStyle = '#020409'
        ctx.fillRect(0, 0, w, h)

        // Background Starfield
        ctx.fillStyle = '#ffffff'
        for (let i = 0; i < 40; i++) {
          const sx = (i * 127 + 19) % w
          const sy = (i * 73 + 31) % h
          ctx.globalAlpha = 0.2 + 0.6 * Math.sin(time * 1.5 + i)
          ctx.fillRect(sx, sy, 1.2, 1.2)
        }
        ctx.globalAlpha = 1.0

        const sunX = w * 0.18
        const sunY = cy

        // Sun Glow
        const grad = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 32)
        grad.addColorStop(0, '#fef08a')
        grad.addColorStop(0.3, '#f59e0b')
        grad.addColorStop(1, 'rgba(245, 158, 11, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(sunX, sunY, 32, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = '#fbbf24'
        ctx.beginPath()
        ctx.arc(sunX, sunY, 8, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = '#fef08a'
        ctx.font = '10px "Space Mono", monospace'
        ctx.fillText('SOL', sunX - 12, sunY + 22)

        // Planetary orbits & planets (Jupiter, Saturn, Uranus, Neptune)
        const planetDistances = [36, 58, 85, 115]
        const planetColors = ['#f59e0b', '#fde047', '#38bdf8', '#38bdf8']

        planetDistances.forEach((dist, idx) => {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(sunX, sunY, dist, 0, Math.PI * 2)
          ctx.stroke()

          const pAng = time * (0.8 / (idx + 1))
          const px = sunX + dist * Math.cos(pAng)
          const py = sunY + dist * Math.sin(pAng)

          ctx.fillStyle = planetColors[idx]
          ctx.beginPath()
          ctx.arc(px, py, 3.5, 0, Math.PI * 2)
          ctx.fill()

          if (idx === 3) {
            ctx.fillStyle = '#38bdf8'
            ctx.font = '9px "Space Mono", monospace'
            ctx.fillText('NEPTUNO', px + 6, py - 4)
          }
        })

        // Kuiper Belt Dust Swarm (debris ring)
        ctx.fillStyle = 'rgba(148, 163, 184, 0.45)'
        for (let i = 0; i < 160; i++) {
          const ang = (i / 160) * Math.PI * 2
          const r = 125 + Math.sin(i * 9) * 14
          const kx = sunX + r * Math.cos(ang)
          const ky = sunY + r * Math.sin(ang) * 0.7
          ctx.fillRect(kx, ky, 1.2, 1.2)
        }

        // Sedna & Clustered TNO orbits (Purple loops pointing right)
        for (let i = 0; i < 4; i++) {
          ctx.save()
          ctx.translate(sunX, sunY)
          ctx.rotate(-0.35 + i * 0.14)
          ctx.strokeStyle = 'rgba(192, 132, 252, 0.65)'
          ctx.lineWidth = 1.4
          ctx.beginPath()
          ctx.ellipse(125, 0, 140, 42, 0, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
        }

        // Planet X Counter-Orbit (Dashed Orange Ellipse)
        ctx.save()
        ctx.translate(sunX, sunY)
        ctx.rotate(2.78)
        ctx.strokeStyle = '#fb923c'
        ctx.lineWidth = 2.2
        ctx.setLineDash([7, 5])
        ctx.beginPath()
        ctx.ellipse(165, 0, 195, 62, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])

        // Orbiting Planet X candidate body
        const p9Ang = time * 0.35
        const px = 165 + 195 * Math.cos(p9Ang)
        const py = 62 * Math.sin(p9Ang)

        // Planet X Glow Aura
        const pGrad = ctx.createRadialGradient(px, py, 2, px, py, 22)
        pGrad.addColorStop(0, '#fb923c')
        pGrad.addColorStop(0.5, 'rgba(251, 146, 60, 0.4)')
        pGrad.addColorStop(1, 'rgba(251, 146, 60, 0)')
        ctx.fillStyle = pGrad
        ctx.beginPath()
        ctx.arc(px, py, 22, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(px, py, 6.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Annotations
        ctx.fillStyle = '#fb923c'
        ctx.font = '10px "Space Mono", monospace'
        ctx.fillText('PLANETA X (CANDIDATO)', w * 0.62, cy - 35)

        ctx.fillStyle = '#c084fc'
        ctx.fillText('TNOs Agrupados (Sedna / 2012 VP113)', w * 0.52, cy + 95)
      }

      // ==========================================
      // CANVAS 1: ACT 2 - SPHEREx 102 Bands Sweep
      // ==========================================
      const c2 = canvasRefs[1].current
      if (c2) {
        const ctx = c2.getContext('2d')
        const w = c2.width
        const h = c2.height
        const cx = w / 2
        const cy = h / 2

        ctx.fillStyle = '#020409'
        ctx.fillRect(0, 0, w, h)

        const satX = w * 0.28
        const satY = cy

        // Sweeping Infrared Light Cone
        const coneAngle = time * 0.6
        const coneLength = 260
        const coneSpread = 0.55

        const coneGrad = ctx.createRadialGradient(satX, satY, 10, satX, satY, coneLength)
        coneGrad.addColorStop(0, 'rgba(255, 107, 53, 0.65)')
        coneGrad.addColorStop(0.5, 'rgba(251, 146, 60, 0.25)')
        coneGrad.addColorStop(1, 'rgba(255, 107, 53, 0)')

        ctx.fillStyle = coneGrad
        ctx.beginPath()
        ctx.moveTo(satX, satY)
        ctx.arc(satX, satY, coneLength, coneAngle - coneSpread, coneAngle + coneSpread)
        ctx.closePath()
        ctx.fill()

        // Spectral Dispersion 6-color Rainbow Rings (0.75 - 5.0 µm)
        const rainbow = ['#38bdf8', '#34d399', '#fbbf24', '#fb923c', '#c084fc', '#f43f5e']
        rainbow.forEach((col, idx) => {
          ctx.strokeStyle = col
          ctx.lineWidth = 1.6
          ctx.beginPath()
          ctx.arc(satX, satY, 100 + idx * 24, coneAngle - coneSpread, coneAngle + coneSpread)
          ctx.stroke()
        })

        // SPHEREx Spacecraft Body
        ctx.fillStyle = '#ffffff'
        ctx.shadowColor = '#00f0ff'
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.arc(satX, satY, 9, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Solar Shield Plate
        ctx.fillStyle = '#38bdf8'
        ctx.fillRect(satX - 16, satY - 4, 32, 3)

        ctx.fillStyle = '#ffffff'
        ctx.font = '10px "Space Mono", monospace'
        ctx.fillText('SPHEREx (ÓRBITA POLAR 700 KM)', satX - 90, satY - 20)
        ctx.fillStyle = '#ff6b35'
        ctx.fillText('BARRIDO ESPECTRAL 102 CANALES', satX + 110, cy + 40)
      }

      // ==========================================
      // CANVAS 2: ACT 3 - Cosmic Ray Matrix vs Human Eye
      // ==========================================
      const c3 = canvasRefs[2].current
      if (c3) {
        const ctx = c3.getContext('2d')
        const w = c3.width
        const h = c3.height
        const cx = w / 2
        const cy = h / 2

        ctx.fillStyle = '#020409'
        ctx.fillRect(0, 0, w, h)

        // Sensor Matrix Grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
        ctx.lineWidth = 1
        for (let x = 40; x < w - 40; x += 30) {
          ctx.beginPath()
          ctx.moveTo(x, 40)
          ctx.lineTo(x, h - 40)
          ctx.stroke()
        }
        for (let y = 40; y < h - 40; y += 30) {
          ctx.beginPath()
          ctx.moveTo(40, y)
          ctx.lineTo(w - 40, y)
          ctx.stroke()
        }

        // Random Cosmic Ray Sharp Pixels (Red Flashes)
        for (let i = 0; i < 18; i++) {
          const rx = 60 + ((i * 137) % (w - 120))
          const ry = 60 + ((i * 89) % (h - 120))
          const intensity = 0.3 + 0.7 * Math.sin(time * 6 + i)
          ctx.fillStyle = `rgba(255, 51, 102, ${Math.max(0, intensity)})`
          ctx.fillRect(rx - 2, ry - 2, 4, 4)
        }

        // Genuine 3-Epoch Collinear Trajectory (P1, P2, P3 in Cyan)
        const p1 = { x: cx - 100, y: cy + 40 }
        const p2 = { x: cx, y: cy }
        const p3 = { x: cx + 100, y: cy - 40 }

        ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)'
        ctx.lineWidth = 1.8
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p3.x, p3.y)
        ctx.stroke()
        ctx.setLineDash([])

        const epochs = [p1, p2, p3]
        epochs.forEach((pt, epIdx) => {
          ctx.fillStyle = '#00f0ff'
          ctx.shadowColor = '#00f0ff'
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0

          ctx.fillStyle = '#ffffff'
          ctx.font = '9px "Space Mono", monospace'
          ctx.fillText(`ÉPOCA P${epIdx + 1}`, pt.x - 22, pt.y + 18)
        })

        // Human Optical Reticle moving over P2
        ctx.strokeStyle = '#00f0ff'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(p2.x, p2.y, 24, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = '#ff3366'
        ctx.font = '10px "Space Mono", monospace'
        ctx.fillText('⚠ RUIDO DE RAYOS CÓSMICOS (DESCARTADOS)', 50, 65)
        ctx.fillStyle = '#00f0ff'
        ctx.fillText('✓ TRAYECTORIA KEPLERIANA COLAPSED (VALIDADA)', cx - 120, h - 55)
      }

      // ==========================================
      // CANVAS 3: ACT 4 - JPL / Minor Planet Center Ticket Radar
      // ==========================================
      const c4 = canvasRefs[3].current
      if (c4) {
        const ctx = c4.getContext('2d')
        const w = c4.width
        const h = c4.height
        const cx = w / 2
        const cy = h / 2

        ctx.fillStyle = '#020409'
        ctx.fillRect(0, 0, w, h)

        // Radar Concentric Circles
        for (let r = 40; r <= 160; r += 40) {
          ctx.strokeStyle = 'rgba(0, 255, 157, 0.25)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(cx, cy, r, 0, Math.PI * 2)
          ctx.stroke()
        }

        // Radar Scanning Sweep
        const sweepAngle = time * 1.8
        ctx.strokeStyle = 'rgba(0, 255, 157, 0.85)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + 160 * Math.cos(sweepAngle), cy + 160 * Math.sin(sweepAngle))
        ctx.stroke()

        // Center Validation Beacon
        ctx.fillStyle = '#00ff9d'
        ctx.shadowColor = '#00ff9d'
        ctx.shadowBlur = 18
        ctx.beginPath()
        ctx.arc(cx, cy, 10, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Pulsing Telemetry Rings
        const pulseR = (time * 45) % 150
        ctx.strokeStyle = `rgba(0, 255, 157, ${Math.max(0, 1 - pulseR / 150)})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(cx, cy, pulseR, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = '#ffffff'
        ctx.font = '10px "Space Mono", monospace'
        ctx.fillText('FICHA OFICIAL DE HALLAZGO • JET PROPULSION LABORATORY', cx - 165, cy + 95)
        ctx.fillStyle = '#00ff9d'
        ctx.fillText('VALIDACIÓN CIUDADANA + TELEMETRÍA WCS (MPC)', cx - 145, cy - 85)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* ===================================================================
          1. STICKY 4-ACT COMMAND RIBBON (CONNECTED BY GLOWING LASER BUS)
          =================================================================== */}
      <div 
        className="act-pipeline-container" 
        style={{ 
          position: 'sticky', 
          top: '140px', 
          zIndex: 35, 
          margin: '0 0 16px 0',
          padding: '8px 14px',
          background: 'rgba(3, 7, 18, 0.92)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.85)'
        }}
      >
        <div className="act-pipeline-bus" />

        {acts.map((act, idx) => {
          const IconComponent = act.icon
          const isActive = activeActIndex === idx

          return (
            <div
              key={act.id}
              className={`act-card-item ${act.cardClass} ${isActive ? 'active' : ''}`}
              onClick={() => {
                soundEngine.playClick()
                setActiveActIndex(idx)
                const el = document.getElementById(act.id)
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              {/* Circular Glowing Thumbnail */}
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${act.accent}45 0%, rgba(3, 7, 18, 0.95) 75%)`,
                border: `1.5px solid ${act.accent}`,
                boxShadow: `0 0 14px ${act.accent}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: act.accent,
                flexShrink: 0
              }}>
                <IconComponent size={18} />
              </div>

              {/* Text metadata */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="font-mono" style={{ 
                  fontSize: '0.66rem', 
                  fontWeight: 700, 
                  color: act.accent,
                  letterSpacing: '0.08em'
                }}>
                  ACTO {act.num}
                </span>
                <span style={{ 
                  fontSize: '0.82rem', 
                  fontWeight: 700, 
                  color: '#ffffff',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap'
                }}>
                  {act.tag}
                </span>
              </div>

              {/* Arrow */}
              <div style={{ marginLeft: 'auto', color: act.accent }}>
                <ChevronRight size={15} />
              </div>
            </div>
          )
        })}
      </div>

      {/* ===================================================================
          2. THE 4 ACTS IN FULL CONTINUOUS SCROLL (EACH AS A SPLIT COCKPIT)
          =================================================================== */}
      {acts.map((act, actIdx) => {
        return (
          <article 
            key={act.id}
            id={act.id}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '14px',
              scrollMarginTop: '230px',
              position: 'relative'
            }}
          >
            {/* Sub-Header Breadcrumb & Telemetry Metadata */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              background: 'rgba(5, 10, 22, 0.85)', 
              border: `1px solid ${act.accent}40`, 
              padding: '8px 18px', 
              borderRadius: '6px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem' }}>
                <Home size={13} color={act.accent} />
                <span style={{ color: 'var(--text-muted)' }}>INICIO</span>
                <span style={{ color: 'var(--text-dim)' }}>/</span>
                <span style={{ color: 'var(--text-muted)' }}>PORTADA</span>
                <span style={{ color: 'var(--text-dim)' }}>/</span>
                <span style={{ color: 'var(--text-muted)' }}>ACTO {act.num}</span>
                <span style={{ color: 'var(--text-dim)' }}>/</span>
                <span className="font-mono" style={{ color: act.accent, fontWeight: 700 }}>
                  {act.tag}
                </span>
              </div>

              <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                SPHEREx • PLANET X
              </div>
            </div>

            {/* Split Screen Cockpit Grid */}
            <div className="narrative-cockpit-grid">
              {/* =========================================================
                  LEFT: LIVE ANIMATED ASTRONOMICAL VIEWPORT
                  ========================================================= */}
              <div className="narrative-canvas-panel" style={{ borderColor: `${act.accent}45` }}>
                {/* Aerospace HUD Viewport Corner Accents */}
                <div className="hud-corner hud-corner-tl" style={{ borderColor: act.accent }} />
                <div className="hud-corner hud-corner-tr" style={{ borderColor: act.accent }} />
                <div className="hud-corner hud-corner-bl" style={{ borderColor: act.accent }} />
                <div className="hud-corner hud-corner-br" style={{ borderColor: act.accent }} />

                {/* Top Canvas Header Bar */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  padding: '12px 18px', 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  zIndex: 4, 
                  pointerEvents: 'none' 
                }}>
                  <div>
                    <div className="font-display" style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.04em' }}>
                      {act.stageTitle}
                    </div>
                    <div className="font-mono" style={{ fontSize: '0.66rem', color: act.accent, letterSpacing: '0.06em' }}>
                      {act.stageSubtitle}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div className="font-mono" style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>
                      {act.fovScale}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: act.accent, fontSize: '0.64rem', marginTop: '2px' }} className="font-mono">
                      <span>N ▲</span>
                      <span>E ◄</span>
                    </div>
                  </div>
                </div>

                {/* Live Simulation Canvas */}
                <canvas
                  ref={canvasRefs[actIdx]}
                  width={900}
                  height={520}
                  style={{ width: '100%', height: '100%', minHeight: '440px', display: 'block' }}
                />

                {/* Bottom Left Legend */}
                <div style={{ 
                  position: 'absolute', 
                  bottom: '12px', 
                  left: '14px', 
                  background: 'rgba(3, 7, 18, 0.92)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  padding: '8px 12px', 
                  borderRadius: '4px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '4px',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  zIndex: 4,
                  pointerEvents: 'none',
                  backdropFilter: 'blur(8px)'
                }}>
                  {act.legend.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        color: item.color, 
                        fontWeight: 700, 
                        width: '18px', 
                        display: 'inline-block' 
                      }}>
                        {item.dash ? '- - -' : (item.circle ? '●' : (item.dot ? '•••' : '───'))}
                      </span>
                      <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Right Coordinates Stamp */}
                <div style={{ 
                  position: 'absolute', 
                  bottom: '12px', 
                  right: '14px', 
                  background: 'rgba(3, 7, 18, 0.92)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  padding: '8px 14px', 
                  borderRadius: '4px', 
                  fontSize: '0.66rem',
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'right',
                  zIndex: 4,
                  pointerEvents: 'none',
                  backdropFilter: 'blur(8px)'
                }}>
                  <div style={{ color: 'var(--text-muted)' }}>RA &nbsp; <span style={{ color: act.accent }}>{act.coords.ra}</span></div>
                  <div style={{ color: 'var(--text-muted)' }}>DEC <span style={{ color: act.accent }}>{act.coords.dec}</span></div>
                  <div style={{ color: 'var(--text-muted)' }}>DIST <span style={{ color: '#ffffff' }}>{act.coords.dist}</span></div>
                  <div style={{ color: 'var(--accent-orange)' }}>OBJ &nbsp; <span style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>{act.coords.obj}</span></div>
                </div>
              </div>

              {/* =========================================================
                  RIGHT: SCIENTIFIC ANALYSIS BRIEFING PANEL
                  ========================================================= */}
              <div className="narrative-briefing-panel" style={{ borderColor: `${act.accent}45` }}>
                {/* Top Panel Bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge-tag" style={{ border: `1px solid ${act.accent}`, color: act.accent, fontSize: '0.72rem', padding: '3px 10px' }}>
                      <BookOpen size={12} />
                      ACTO {act.num} / 04
                    </span>

                    <span className="badge-tag" style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                      <Play size={11} fill={act.accent} color={act.accent} />
                      SIMULACIÓN EN VIVO
                    </span>
                  </div>

                  {/* Act Main Title */}
                  <h3 className="font-display" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.85rem)', color: '#ffffff', margin: '0 0 10px 0', fontWeight: 800 }}>
                    {act.title}
                  </h3>

                  {/* Act Body Narrative */}
                  <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
                    {act.body}
                  </p>
                </div>

                {/* Section: EVIDENCIAS CLAVE */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <span className="radar-dot" style={{ width: '5px', height: '5px', background: act.accent }} />
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: act.accent, fontWeight: 700, letterSpacing: '0.08em' }}>
                      EVIDENCIAS CLAVE
                    </span>
                  </div>

                  {/* 3 Evidence Cards Grid */}
                  <div className="evidence-grid">
                    {act.evidence.map((ev, eIdx) => {
                      const EvIcon = ev.icon
                      return (
                        <div key={eIdx} className="evidence-card" style={{ borderColor: `${act.accent}30` }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: act.accent }}>
                            <EvIcon size={14} />
                            <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff' }}>
                              {ev.title}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                            {ev.desc}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Scientific Conclusion Callout Box */}
                <div className="conclusion-box" style={{ borderColor: act.accent }}>
                  <div style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    background: `radial-gradient(circle, ${act.accent}40 0%, rgba(3, 7, 18, 0.95) 70%)`,
                    border: `1.5px solid ${act.accent}`,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: act.accent,
                    flexShrink: 0
                  }}>
                    <Zap size={18} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div className="font-mono" style={{ fontSize: '0.68rem', color: act.accent, fontWeight: 700, letterSpacing: '0.06em' }}>
                      CONCLUSIÓN CIENTÍFICA
                    </div>
                    <div style={{ fontSize: '0.86rem', color: '#ffffff', fontWeight: 700, margin: '2px 0' }}>
                      {act.conclusionTitle}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {act.conclusionDesc}
                    </div>
                  </div>

                  <div style={{ color: act.accent }}>
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stepper for this Act */}
            <div className="bottom-mission-stepper" style={{ borderColor: `${act.accent}35` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={14} color={act.accent} />
                <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                  PROGRESO DE LA MISIÓN
                </span>
              </div>

              {/* Stepper Nodes */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                {acts.map((stAct, sIdx) => {
                  const isSelected = actIdx === sIdx
                  return (
                    <button
                      key={stAct.id}
                      onClick={() => {
                        soundEngine.playClick()
                        const el = document.getElementById(stAct.id)
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        outline: 'none',
                        padding: '4px 6px'
                      }}
                    >
                      <span style={{ 
                        width: '7px', 
                        height: '7px', 
                        borderRadius: '50%', 
                        background: isSelected ? stAct.accent : 'rgba(255,255,255,0.2)',
                        boxShadow: isSelected ? `0 0 8px ${stAct.accent}` : 'none'
                      }} />
                      <span className="font-mono" style={{ 
                        fontSize: '0.72rem', 
                        fontWeight: isSelected ? 700 : 500, 
                        color: isSelected ? '#ffffff' : 'var(--text-dim)',
                        letterSpacing: '0.04em'
                      }}>
                        {stAct.shortTag}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Step and Percentage readout */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="font-mono" style={{ fontSize: '0.74rem', color: act.accent, fontWeight: 700 }}>
                  PASO {actIdx + 1}/4
                </span>
                <span className="font-mono" style={{ fontSize: '0.74rem', color: '#ffffff', opacity: 0.75 }}>
                  {(actIdx + 1) * 25}%
                </span>
                <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.12)', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    height: '100%', 
                    width: `${(actIdx + 1) * 25}%`, 
                    background: act.accent, 
                    boxShadow: `0 0 6px ${act.accent}`,
                    borderRadius: '2px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
