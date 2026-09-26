// Complete Bilingual Dictionary (ES / EN) for NASA Space Apps 2026
// Challenge: Planet X and SPHEREx - Clean, Modern Aerospace Interface

export const TRANSLATIONS = {
  es: {
    appTitle: 'SPHEREx Planet Hunter',
    appSubtitle: 'Misión NASA SPHEREx • Búsqueda Multitemporal del Planeta X',
    badgeMission: 'MISIÓN NASA SPHEREx (LANZAMIENTO 2025)',
    missionStatus: 'TELEMETRÍA: ACTIVA',
    orbitInfo: 'Órbita Heliosíncrona 700km | 102 Bandas Infrarrojas',
    
    // Top Tabs
    tabStory: '1. Expediente: Planeta X',
    tabObservatory: '2. Observatorio Temporal',
    tabSpectroscopy: '3. Espectroscopía (102 Bandas)',
    tabBelts3D: '4. Simulador de Órbitas (A y B)',
    tabIrsa: '5. Consola NASA IRSA',
    orbitModeA: 'Órbita A: Planeta Nueve & Sedna (500 UA)',
    orbitModeB: 'Órbita B: SPHEREx en la Tierra (700 km)',

    // Header Actions
    navJudging: 'Manual de Misión (Guía de Campo)',
    navFieldManual: 'Manual de Misión (Guía de Campo)',
    navReport: 'Ficha de Hallazgo',
    audioOn: 'Música Ambiental ON',
    audioOff: 'Música Ambiental OFF',
    modeExplorer: 'Explorador',
    modePro: 'Astrofísico PRO',
    
    // Real Data vs Simulation Modes
    viewModeSpherex: 'Relevos Semestrales SPHEREx (Blink)',
    viewModeNasaArchive: 'Archivo Real Infrarrojo NASA IRSA',
    viewModeNasaDesc: 'Imágenes infrarrojas reales obtenidas de los servidores de Caltech/IPAC IRSA (AllWISE y 2MASS).',
    liveIrsaConnected: 'NASA IPAC IRSA Conectado en Vivo',

    // Stats
    statCandidates: 'Candidatos Analizados',
    statStreak: 'Racha de Aciertos',
    statPoints: 'Puntos de Ciencia',
    statRank: 'Rango:',
    rankRookie: 'Observador Novato',
    rankAnalyst: 'Analista Infrarrojo',
    rankHunter: 'Cazador de Planetas',
    rankAstrophysicist: 'Astrofísico Senior',

    // Viewport Controls
    modeBlink: 'Parpadeo (Blink)',
    modeSplit: 'Deslizador Dividido',
    modeDiff: 'Sustracción (I₂ - I₁)',
    modeRgb: 'Color Falso Infrarrojo (RGB)',
    epoch1: 'Pase 1 (Jun 2025)',
    epoch2: 'Pase 2 (Dic 2025)',
    epoch3: 'Pase 3 (Jun 2026)',
    blinkSpeed: 'Velocidad de Parpadeo',
    zoomIn: 'Acercar (+)',
    zoomOut: 'Alejar (-)',
    resetView: 'Restablecer',
    autoLock: 'Fijar Objetivo',
    crosshairsOn: 'Retícula ON',
    crosshairsOff: 'Retícula OFF',

    // Spectroscopy
    spectroscopyTitle: 'Espectroscopía Infrarroja SPHEREx (102 Bandas)',
    spectroscopyDesc: 'Rango espectral continuo 0.75 - 5.00 µm. Las caídas moleculares identifican mundos helados y descartan estrellas.',
    bandLabel: 'Banda',
    wavelengthLabel: 'Longitud de Onda',
    fluxLabel: 'Flujo Normalizado',
    filterAll: 'Todas las Bandas (102)',
    filterMethane: 'Absorción de Metano (CH₄)',
    filterWater: 'Absorción de Agua (H₂O)',
    wienTemp: 'Temp. Térmica Estimada (Wien):',

    // Astrometry Deck
    astrometryTitle: 'Deck Astrométrico J2000',
    coordRa: 'Ascensión Recta (RA)',
    coordDec: 'Declinación (Dec)',
    parallaxAngle: 'Paralaje Trigonométrico (π)',
    properMotion: 'Movimiento Propio (μ)',
    estDistance: 'Distancia Heliocéntrica Estimada',
    confirmCandidate: 'Validar y Emitir Certificado NASA',
    dismissArtifact: 'Descartar como Artefacto / Ruido',

    // Targets
    targetCatalogTitle: 'Catálogo de Objetivos SPHEREx',
    selectTarget: 'Seleccionar Objetivo',

    // Storytelling & Mission Briefing
    storyIntroTitle: 'Expediente: Planeta X',
    storyIntroSubtitle: '¿Por qué la humanidad busca el noveno planeta y por qué la IA no puede hacerlo sola?',
    storyAct1Title: 'Acto I: La Anomalía Gravitacional en la Oscuridad',
    storyAct1Body: 'En los confines helados más allá de Neptuno, un grupo de objetos transneptunianos extremos (Sedna, 2012 VP113) comparten una inclinación orbital y perihelio extrañamente alineados. Matemáticamente, la probabilidad de que esto sea casualidad es menor al 0.007%. Un planeta gigante helado, de 5 a 10 veces la masa de la Tierra, acecha a más de 450 Unidades Astronómicas.',
    storyAct2Title: 'Acto II: SPHEREx, El Ojo Infrarrojo de la NASA',
    storyAct2Body: 'Lanzada en 2025 a 700 km de altura, la misión SPHEREx barre todo el cielo cada 6 meses. No ve luz visible sino luz infrarroja cercana en 102 canales continuos. Los mundos lejanos no reflejan casi luz solar, pero emiten su propio calor primordial infrarrojo (~40 Kelvin).',
    storyAct3Title: 'Acto III: El Factor Humano contra el Ruido',
    storyAct3Body: 'Los algoritmos de inteligencia artificial se saturan con millones de impactos de rayos cósmicos, destellos ópticos y ruido de detector que imitan planetas móviles. El cerebro humano posee una capacidad evolutiva inigualable para detectar desplazamientos coherentes entre épocas temporales. Tú eres el filtro definitivo.',
    storyAct4Title: 'Acto IV: Tu Herramienta de Ciencia Ciudadana',
    storyAct4Body: 'Usa el comparador de Clyde Tombaugh digitalizado: haz parpadear las observaciones semestrales de SPHEREx. Analiza el espectro de 102 bandas en busca de metano y agua helada. Si encuentras un desplazamiento retrógrado consistente, generarás una ficha formal de descubrimiento para el Jet Propulsion Laboratory (JPL).',
    storyStartHunting: 'IR AL OBSERVATORIO TEMPORAL',
    storyPrev: 'Anterior',
    storyNext: 'Siguiente'
  },
  en: {
    appTitle: 'SPHEREx Planet Hunter',
    appSubtitle: 'NASA SPHEREx Mission • Multi-Temporal Search for Planet X',
    badgeMission: 'NASA SPHEREx MISSION (LAUNCHED 2025)',
    missionStatus: 'TELEMETRY: NOMINAL',
    orbitInfo: 'Sun-Synchronous 700km Orbit | 102 Infrared Bands',
    
    // Top Tabs
    tabStory: '1. Dossier: Planet X',
    tabObservatory: '2. Multi-Epoch Observatory',
    tabSpectroscopy: '3. Spectroscopy (102 Bands)',
    tabBelts3D: '4. Orbit Simulator (A & B)',
    tabIrsa: '5. NASA IRSA Console',
    orbitModeA: 'Orbit A: Planet Nine & Sedna (500 AU)',
    orbitModeB: 'Orbit B: SPHEREx Earth Orbit (700 km)',

    // Header Actions
    navJudging: 'Field Manual & Guide',
    navFieldManual: 'Field Manual & Guide',
    navReport: 'Discovery Ticket',
    audioOn: 'Ambient Music ON',
    audioOff: 'Ambient Music OFF',
    modeExplorer: 'Explorer',
    modePro: 'Astrophysicist PRO',

    // Real Data vs Simulation Modes
    viewModeSpherex: 'SPHEREx Multi-Epoch Survey (Blink)',
    viewModeNasaArchive: 'NASA IRSA Real Infrared Archive',
    viewModeNasaDesc: 'Real infrared imagery queried directly from Caltech/IPAC IRSA (AllWISE and 2MASS archives).',
    liveIrsaConnected: 'NASA IPAC IRSA Live Connected',

    // Stats
    statCandidates: 'Targets Analyzed',
    statStreak: 'Verification Streak',
    statPoints: 'Science Points',
    statRank: 'Rank:',
    rankRookie: 'Novice Observer',
    rankAnalyst: 'Infrared Analyst',
    rankHunter: 'Planet Hunter',
    rankAstrophysicist: 'Senior Astrophysicist',

    // Viewport Controls
    modeBlink: 'Blink Comparator',
    modeSplit: 'Split Screen Swipe',
    modeDiff: 'Photometric Difference (I₂ - I₁)',
    modeRgb: 'False Color Infrared (RGB)',
    epoch1: 'Pass 1 (Jun 2025)',
    epoch2: 'Pass 2 (Dec 2025)',
    epoch3: 'Pass 3 (Jun 2026)',
    blinkSpeed: 'Blink Speed',
    zoomIn: 'Zoom In (+)',
    zoomOut: 'Zoom Out (-)',
    resetView: 'Reset View',
    autoLock: 'Lock Target',
    crosshairsOn: 'Crosshairs ON',
    crosshairsOff: 'Crosshairs OFF',

    // Spectroscopy
    spectroscopyTitle: 'SPHEREx Infrared Spectroscopy (102 Bands)',
    spectroscopyDesc: 'Continuous 0.75 - 5.00 µm range. Molecular dips confirm cold planetary bodies and filter background stars.',
    bandLabel: 'Band',
    wavelengthLabel: 'Wavelength',
    fluxLabel: 'Normalized Flux',
    filterAll: 'All Bands (102)',
    filterMethane: 'Methane Absorption (CH₄)',
    filterWater: 'Water Ice Absorption (H₂O)',
    wienTemp: 'Est. Wien Thermal Temp:',

    // Astrometry Deck
    astrometryTitle: 'J2000 Astrometry Deck',
    coordRa: 'Right Ascension (RA)',
    coordDec: 'Declination (Dec)',
    parallaxAngle: 'Trigonometric Parallax (π)',
    properMotion: 'Proper Motion (μ)',
    estDistance: 'Estimated Heliocentric Distance',
    confirmCandidate: 'Validate & Issue NASA Certificate',
    dismissArtifact: 'Dismiss as Artifact / Noise',

    // Targets
    targetCatalogTitle: 'SPHEREx Target Catalog',
    selectTarget: 'Select Target',

    // Storytelling
    storyIntroTitle: 'The Odyssey of Planet Nine',
    storyIntroSubtitle: 'Why humanity searches for the ninth world, and why AI cannot do it alone',
    storyAct1Title: 'Act I: The Gravitational Ghost in the Dark',
    storyAct1Body: 'In the frozen darkness beyond Neptune, detached extreme trans-Neptunian objects (Sedna, 2012 VP113) cluster in perihelion orientation and orbital inclination. Statistically, this clustering has less than 0.007% chance of coincidence. A massive ice planet, 5 to 10 Earth masses, lurks at over 450 Astronomical Units.',
    storyAct2Title: 'Act II: SPHEREx, NASA\'s Infrared All-Sky Eye',
    storyAct2Body: 'Launched in 2025 to a 700km polar orbit, NASA\'s SPHEREx spacecraft scans the entire celestial sphere every 6 months. It observes in 102 contiguous near-infrared bands. Distant outer worlds reflect almost no sunlight, but emit faint internal thermal glow at ~40 Kelvin.',
    storyAct3Title: 'Act III: Human Pattern Recognition vs Noise',
    storyAct3Body: 'AI pipelines are routinely spoofed by detector glitches, cosmic ray strikes, and infrared diffraction spikes that mimic moving asteroids. The human brain possesses unmatched evolutionary pattern recognition to perceive multi-epoch retrograde shifts. You are the ultimate verification filter.',
    storyAct4Title: 'Act IV: Your Citizen Science Toolkit',
    storyAct4Body: 'Harness a modernized digital blink comparator: toggle semi-annual SPHEREx exposures. Inspect 102-band spectra for telltale methane and water ice signatures. If motion and physics correlate, generate a verified discovery ticket directly for Caltech and NASA JPL.',
    storyStartHunting: 'GO TO MULTI-EPOCH OBSERVATORY',
    storyPrev: 'Previous',
    storyNext: 'Next'
  }
}
