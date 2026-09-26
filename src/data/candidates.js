// SPHEREx Science Target Catalog
// Real astronomical modeling: 102 near-infrared bands (0.75 - 5.00 micrometers)

export const CANDIDATES = [
  {
    id: 'p9-alpha',
    name: 'SPX-P9-CANDIDATE-ALPHA',
    type: 'planet_nine',
    badge: 'TOP PRIORITY: PLANET 9 CANDIDATE',
    constellation: 'Taurus / Orion Border',
    ra: '04h 28m 42.1s',
    dec: '+16° 12\' 08.4"',
    raDeg: 67.1754,
    decDeg: 16.2023,
    eclipticLat: '-4.2°',
    estimatedDistanceAU: 485,
    orbitalPeriodYrs: 11400,
    wienTempK: 44,
    apparentMagNIR: 19.8,
    parallaxArcsec: 0.0041,
    properMotionArcsecYr: 0.012,
    description: {
      es: 'Candidato de alta probabilidad al Planeta Nueve. Muestra un desplazamiento retrógrado extremadamente lento consistente con una órbita a ~485 UA. El espectro infrarrojo de 102 bandas de SPHEREx revela una fuerte absorción de metano (CH4) y hielos de agua/nitrógeno, descartando estrellas de fondo o asteroides del cinturón principal.',
      en: 'High-probability Planet Nine candidate. Exhibits extremely slow retrograde shift consistent with an orbit at ~485 AU. SPHEREx 102-band infrared spectrum reveals deep methane (CH4) and water/nitrogen ice absorption, ruling out background stars or main-belt asteroids.'
    },
    // Positions in canvas normalized coordinates (0-1000) for Epoch 1, 2, 3
    epochs: [
      { epoch: 1, date: '2025-06-14', x: 495, y: 512, brightness: 1.0, fwhm: 4.8 },
      { epoch: 2, date: '2025-12-18', x: 508, y: 506, brightness: 1.05, fwhm: 4.9 },
      { epoch: 3, date: '2026-06-22', x: 521, y: 499, brightness: 1.02, fwhm: 4.8 }
    ],
    // Synthetic 102-band infrared spectrum (0.75 to 5.0 um in 102 steps)
    spectralFeatures: {
      dominantMolecules: ['CH4 (Metano)', 'H2O (Hielo)', 'N2'],
      methaneBands: [1.66, 2.32, 3.31],
      waterIceBands: [1.5, 2.02, 3.1],
      baseContinuum: 'cold_body',
      peakWavelength: 3.8
    }
  },
  {
    id: 'tno-sedna-2026',
    name: 'SPX-TNO-SEDNOID-2026',
    type: 'trans_neptunian',
    badge: 'EXTREME TNO / SEDNOID',
    constellation: 'Cetus',
    ra: '03h 15m 12.8s',
    dec: '-02° 44\' 51.0"',
    raDeg: 48.8033,
    decDeg: -2.7475,
    eclipticLat: '-18.6°',
    estimatedDistanceAU: 88,
    orbitalPeriodYrs: 4200,
    wienTempK: 32,
    apparentMagNIR: 21.1,
    parallaxArcsec: 0.0227,
    properMotionArcsecYr: 0.038,
    description: {
      es: 'Objeto transneptuniano extremo en el disco disperso distante. Presenta una superficie rojiza ultra-fría rica en tolinas orgánicas y hielos volátiles. Su perihelio distante sugiere que fue perturbado en el pasado por un cuerpo masivo exterior.',
      en: 'Extreme trans-Neptunian object in the distant scattered disk. Features an ultra-cold reddish surface rich in organic tholins and volatile ices. Its distant perihelion strongly suggests past perturbation by an exterior massive body.'
    },
    epochs: [
      { epoch: 1, date: '2025-06-14', x: 620, y: 380, brightness: 0.85, fwhm: 4.6 },
      { epoch: 2, date: '2025-12-18', x: 642, y: 395, brightness: 0.90, fwhm: 4.7 },
      { epoch: 3, date: '2026-06-22', x: 665, y: 410, brightness: 0.88, fwhm: 4.6 }
    ],
    spectralFeatures: {
      dominantMolecules: ['Tolinas', 'H2O Hielo', 'CO2'],
      methaneBands: [2.32],
      waterIceBands: [1.5, 2.0],
      baseContinuum: 'cold_tno',
      peakWavelength: 4.2
    }
  },
  {
    id: 'wise-y-dwarf',
    name: 'SPX-BD-Y0855-ANALOG',
    type: 'brown_dwarf',
    badge: 'ULTRA-COOL Y-DWARF',
    constellation: 'Hydra',
    ra: '08h 55m 10.8s',
    dec: '-07° 14\' 22.5"',
    raDeg: 133.795,
    decDeg: -7.2396,
    eclipticLat: '-22.1°',
    estimatedDistanceAU: 151000, // ~2.4 parsecs
    orbitalPeriodYrs: 0,
    wienTempK: 260,
    apparentMagNIR: 17.2,
    parallaxArcsec: 0.418,
    properMotionArcsecYr: 1.82,
    description: {
      es: 'Enana marrón ultrafría tipo Y, la clase más fría de estrellas fallidas conocida. Temperatura de solo -13°C (260 K) con nubes de vapor de agua en su atmósfera. Muestra un altísimo movimiento propio anual en las imágenes de SPHEREx.',
      en: 'Ultra-cool Y-type brown dwarf, the coldest known class of failed stars. Sub-zero temperature of 260 K with probable water clouds. Exhibits extreme proper motion across SPHEREx semi-annual epochs.'
    },
    epochs: [
      { epoch: 1, date: '2025-06-14', x: 380, y: 640, brightness: 1.4, fwhm: 5.2 },
      { epoch: 2, date: '2025-12-18', x: 440, y: 615, brightness: 1.4, fwhm: 5.2 },
      { epoch: 3, date: '2026-06-22', x: 500, y: 590, brightness: 1.38, fwhm: 5.2 }
    ],
    spectralFeatures: {
      dominantMolecules: ['H2O Vapor', 'NH3 (Amoniaco)', 'CH4'],
      methaneBands: [1.66, 2.32, 3.31],
      waterIceBands: [1.4, 1.9, 2.7],
      baseContinuum: 'warm_dwarf',
      peakWavelength: 4.6
    }
  },
  {
    id: 'neo-sph-2026',
    name: 'SPX-NEO-2026-AP1',
    type: 'asteroid_neo',
    badge: 'NEAR-EARTH ASTEROID (NEO)',
    constellation: 'Pegasus',
    ra: '22h 10m 05.2s',
    dec: '+12° 35\' 18.0"',
    raDeg: 332.5217,
    decDeg: 12.5883,
    eclipticLat: '+1.4°',
    estimatedDistanceAU: 1.15,
    orbitalPeriodYrs: 1.25,
    wienTempK: 295,
    apparentMagNIR: 15.6,
    parallaxArcsec: 14.2,
    properMotionArcsecYr: 185.0,
    description: {
      es: 'Asteroide cercano a la Tierra (NEO) de desplazamiento rápido a lo largo del plano de la eclíptica. Cruza el campo de visión de SPHEREx a gran velocidad. Su espectro es rocoso/silicatado sin firmas de hielos volátiles.',
      en: 'Fast-moving Near-Earth Asteroid (NEO) traversing near the ecliptic plane. Crosses the SPHEREx field of view at notable angular velocity. Rocky silicate spectrum with no volatile ice signatures.'
    },
    epochs: [
      { epoch: 1, date: '2025-06-14', x: 210, y: 310, brightness: 1.6, fwhm: 5.5 },
      { epoch: 2, date: '2025-12-18', x: 530, y: 480, brightness: 1.55, fwhm: 5.5 },
      { epoch: 3, date: '2026-06-22', x: 840, y: 660, brightness: 1.5, fwhm: 5.5 }
    ],
    spectralFeatures: {
      dominantMolecules: ['Silicatos', 'Hierro/Piroxeno'],
      methaneBands: [],
      waterIceBands: [],
      baseContinuum: 'solar_reflection',
      peakWavelength: 1.2
    }
  },
  {
    id: 'cosmic-ray-glitch',
    name: 'SPX-ARTIFACT-CR-774',
    type: 'artifact_cosmic_ray',
    badge: 'FALSE POSITIVE / COSMIC RAY HIT',
    constellation: 'Cygnus',
    ra: '20h 44m 33.1s',
    dec: '+41° 15\' 02.4"',
    raDeg: 311.1379,
    decDeg: 41.2507,
    eclipticLat: '+56.2°',
    estimatedDistanceAU: 0,
    orbitalPeriodYrs: 0,
    wienTempK: 0,
    apparentMagNIR: 13.0,
    parallaxArcsec: 0,
    properMotionArcsecYr: 0,
    description: {
      es: 'Impacto de rayo cósmico en el detector H2RG de SPHEREx. Aparece como un evento puntual ultra-brillante y sin difracción óptica únicamente en la Época 2, pero desaparece en la Época 1 y 3. Este caso entrena al científico ciudadano a descartar artefactos que confunden a las IAs.',
      en: 'Cosmic ray hit on the SPHEREx H2RG detector array. Appears as an ultra-sharp, non-PSF pixel strike only in Epoch 2, completely absent in Epochs 1 and 3. Demonstrates why human pattern recognition excels over automated AI pipelines.'
    },
    epochs: [
      { epoch: 1, date: '2025-06-14', x: 710, y: 290, brightness: 0.0, fwhm: 0.0 },
      { epoch: 2, date: '2025-12-18', x: 710, y: 290, brightness: 2.8, fwhm: 1.8 }, // unnaturally sharp
      { epoch: 3, date: '2026-06-22', x: 710, y: 290, brightness: 0.0, fwhm: 0.0 }
    ],
    spectralFeatures: {
      dominantMolecules: ['Sin líneas moleculares (Ruido de silicio)'],
      methaneBands: [],
      waterIceBands: [],
      baseContinuum: 'flat_spike',
      peakWavelength: 2.5
    }
  }
]

// Generate 102 wavelength channels from 0.75 to 5.00 micrometers
export function generate102BandsSpectrum(candidate) {
  const bands = []
  const minLambda = 0.75
  const maxLambda = 5.00
  const totalBands = 102

  for (let i = 0; i < totalBands; i++) {
    const lambda = minLambda + (i / (totalBands - 1)) * (maxLambda - minLambda)
    let flux = 1.0

    if (candidate.type === 'planet_nine') {
      // Blackbody-like cold curve peaking in mid-IR + methane & water dips
      const planckBase = Math.exp(-Math.pow((lambda - 3.8) / 1.6, 2)) * 1.8 + 0.2
      flux = planckBase
      // Methane dips (1.66, 2.32, 3.31)
      candidate.spectralFeatures.methaneBands.forEach(dipWl => {
        const dist = Math.abs(lambda - dipWl)
        if (dist < 0.18) {
          flux *= (0.25 + (dist / 0.18) * 0.75)
        }
      })
      // Water ice dip around 2.0 and 3.1
      candidate.spectralFeatures.waterIceBands.forEach(dipWl => {
        const dist = Math.abs(lambda - dipWl)
        if (dist < 0.22) {
          flux *= (0.45 + (dist / 0.22) * 0.55)
        }
      })
    } else if (candidate.type === 'brown_dwarf') {
      // Y-dwarf warm IR with steep absorption valleys
      flux = Math.exp(-Math.pow((lambda - 4.5) / 1.4, 2)) * 2.2 + 0.3
      if (Math.abs(lambda - 1.66) < 0.2) flux *= 0.3
      if (Math.abs(lambda - 3.3) < 0.3) flux *= 0.2
      if (Math.abs(lambda - 2.7) < 0.25) flux *= 0.35 // H2O vapor
    } else if (candidate.type === 'trans_neptunian') {
      flux = 0.4 + 0.25 * lambda
      if (Math.abs(lambda - 2.0) < 0.2) flux *= 0.6
      if (Math.abs(lambda - 3.1) < 0.25) flux *= 0.5
    } else if (candidate.type === 'asteroid_neo') {
      // Rocky asteroid: reflected sunlight decreasing with lambda + thermal emission above 3.5um
      const reflected = 1.8 * Math.exp(-lambda * 0.8)
      const thermal = 0.5 * Math.exp(lambda * 0.3 - 1)
      flux = reflected + thermal
    } else {
      // Cosmic ray flat or single spike
      flux = (i === 45) ? 4.5 : (0.1 + Math.random() * 0.05)
    }

    // Add tiny instrument noise (SNR ~ 50)
    flux += (Math.random() - 0.5) * 0.03

    bands.push({
      bandIndex: i + 1,
      wavelength: Number(lambda.toFixed(3)),
      flux: Math.max(0.01, Number(flux.toFixed(3)))
    })
  }

  return bands
}
