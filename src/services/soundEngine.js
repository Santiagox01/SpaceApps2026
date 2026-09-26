// Procedural Deep Space Ambient Music & Audio Engine
// Web Audio API Generative Synthesis - 100% offline, zero external mp3 files
// Generates lush, cinematic space pads, celestial shimmers, and soft UI tactile sounds

class SoundEngine {
  constructor() {
    this.ctx = null
    this.isMuted = false
    this.masterGain = null
    this.ambientGain = null
    this.reverbNode = null
    this.delayNode = null
    this.delayFeedback = null
    this.isAmbientPlaying = false
    this.chordTimer = null
    this.sparkleTimer = null
    this.activeChordNodes = []
    this.volume = 0.5

    // Ambient space chord progressions (Frequencies in Hz: warm pads, root notes, fifths, ninths)
    this.chords = [
      // Dm9 (Deep void / mysterious cosmic tranquility)
      [73.42, 110.0, 146.83, 220.0, 261.63, 329.63, 440.0],
      // Bbmaj7#11 (Ethereal distant nebula)
      [58.27, 116.54, 146.83, 174.61, 220.0, 293.66, 349.23],
      // Fmaj9 (Cosmic sunrise / planetary horizon)
      [65.41, 130.81, 164.81, 196.0, 261.63, 329.63, 392.0],
      // C6/9 / G (Floating in zero gravity)
      [49.0, 98.0, 130.81, 146.83, 196.0, 293.66, 392.0],
      // Am9 (Interstellar silence)
      [55.0, 110.0, 164.81, 220.0, 246.94, 329.63, 440.0]
    ]
    this.currentChordIndex = 0

    // Pentatonic scale for soft celestial starlight sparkles
    this.sparklePitches = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51]
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    this.setupAudioGraph()
  }

  setupAudioGraph() {
    if (!this.ctx || this.masterGain) return

    try {
      // Master Gain
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime)
      this.masterGain.connect(this.ctx.destination)

      // Ambient bus gain
      this.ambientGain = this.ctx.createGain()
      this.ambientGain.gain.setValueAtTime(0.06, this.ctx.currentTime)

      // Space Delay / Echo line (creates deep cosmic resonance)
      this.delayNode = this.ctx.createDelay()
      this.delayNode.delayTime.setValueAtTime(0.65, this.ctx.currentTime)

      this.delayFeedback = this.ctx.createGain()
      this.delayFeedback.gain.setValueAtTime(0.42, this.ctx.currentTime)

      const delayFilter = this.ctx.createBiquadFilter()
      delayFilter.type = 'lowpass'
      delayFilter.frequency.setValueAtTime(1400, this.ctx.currentTime)

      // Delay loop: delay -> filter -> feedback -> delay
      this.delayNode.connect(delayFilter)
      delayFilter.connect(this.delayFeedback)
      this.delayFeedback.connect(this.delayNode)
      this.delayFeedback.connect(this.masterGain)

      this.ambientGain.connect(this.masterGain)
      this.ambientGain.connect(this.delayNode)
    } catch (e) {
      console.warn('Audio graph setup warning:', e)
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    if (!this.ctx) this.init()
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.7
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime)
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.3)
    }
    if (!this.isMuted && !this.isAmbientPlaying) {
      this.startAmbient()
    }
    return this.isMuted
  }

  // Generative Space Ambient Pad Crossfader
  startAmbient() {
    this.init()
    if (!this.ctx || this.isAmbientPlaying) return
    this.isAmbientPlaying = true

    // Play initial ambient chord
    this.transitionToNextChord()

    // Rotate ambient chord progression every 12 seconds with gentle 6-second crossfades
    this.chordTimer = setInterval(() => {
      if (this.isAmbientPlaying && !this.isMuted) {
        this.transitionToNextChord()
      }
    }, 12000)

    // Schedule gentle starlight bell sparkles (every 4-7 seconds randomly)
    const scheduleSparkle = () => {
      if (!this.isAmbientPlaying) return
      const delay = 3500 + Math.random() * 4500
      this.sparkleTimer = setTimeout(() => {
        if (this.isAmbientPlaying && !this.isMuted) {
          this.playCelestialSparkle()
        }
        scheduleSparkle()
      }, delay)
    }
    scheduleSparkle()
  }

  stopAmbient() {
    this.isAmbientPlaying = false
    if (this.chordTimer) clearInterval(this.chordTimer)
    if (this.sparkleTimer) clearTimeout(this.sparkleTimer)
    this.chordTimer = null
    this.sparkleTimer = null

    // Fade out active notes
    if (this.ctx && this.activeChordNodes.length > 0) {
      const now = this.ctx.currentTime
      this.activeChordNodes.forEach(node => {
        try {
          node.gain.gain.cancelScheduledValues(now)
          node.gain.gain.linearRampToValueAtTime(0.0001, now + 2.0)
          setTimeout(() => {
            try {
              node.osc.stop()
              node.osc.disconnect()
            } catch (e) {}
          }, 2100)
        } catch (e) {}
      })
      this.activeChordNodes = []
    }
  }

  transitionToNextChord() {
    if (!this.ctx || !this.ambientGain) return
    const now = this.ctx.currentTime
    const chordFrequencies = this.chords[this.currentChordIndex]
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length

    // Fade out previous chord smoothly over 5 seconds
    const oldNodes = [...this.activeChordNodes]
    this.activeChordNodes = []
    oldNodes.forEach(node => {
      try {
        node.gain.gain.cancelScheduledValues(now)
        node.gain.gain.linearRampToValueAtTime(0.0001, now + 5.0)
        setTimeout(() => {
          try {
            node.osc.stop()
            node.osc.disconnect()
          } catch (e) {}
        }, 5200)
      } catch (e) {}
    })

    // Filter for ultra-warm, velvety sound (removes all harsh high frequencies)
    const chordFilter = this.ctx.createBiquadFilter()
    chordFilter.type = 'lowpass'
    chordFilter.frequency.setValueAtTime(450, now)
    chordFilter.frequency.exponentialRampToValueAtTime(650, now + 6)
    chordFilter.frequency.exponentialRampToValueAtTime(450, now + 12)
    chordFilter.connect(this.ambientGain)

    // Build soft multi-voice pad
    chordFrequencies.forEach((freq, idx) => {
      try {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        // Pure sine for bass, gentle triangle with subtle detune for upper harmony
        osc.type = idx < 2 ? 'sine' : 'triangle'
        const detuneCents = (Math.random() - 0.5) * 6 // Natural lush chorus warmth
        osc.frequency.setValueAtTime(freq, now)
        osc.detune.setValueAtTime(detuneCents, now)

        // Soft slow attack (3.5s) to avoid clicks or jarring entrances
        gain.gain.setValueAtTime(0.0001, now)
        const targetVol = idx < 2 ? 0.05 : 0.025 / Math.sqrt(idx)
        gain.gain.linearRampToValueAtTime(targetVol, now + 3.5)

        osc.connect(gain)
        gain.connect(chordFilter)

        osc.start(now)
        this.activeChordNodes.push({ osc, gain })
      } catch (e) {}
    })
  }

  // Soft starlight sparkle (distant cosmic bell)
  playCelestialSparkle() {
    if (this.isMuted || !this.ctx || !this.ambientGain) return
    try {
      const now = this.ctx.currentTime
      const pitch = this.sparklePitches[Math.floor(Math.random() * this.sparklePitches.length)]

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const filter = this.ctx.createBiquadFilter()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(pitch, now)

      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(pitch, now)
      filter.Q.setValueAtTime(2.0, now)

      // Soft bell envelope: fast soft attack (20ms), long ethereal decay (2.8s)
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.linearRampToValueAtTime(0.018, now + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 2.6)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ambientGain)
      if (this.delayNode) gain.connect(this.delayNode)

      osc.start(now)
      osc.stop(now + 2.7)
    } catch (e) {}
  }

  // Soft tactile UI click (pleasant, subtle acoustic feel - NO harsh buzz)
  playClick() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return
    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const filter = this.ctx.createBiquadFilter()

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1200, now)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(680, now)
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.025)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.masterGain || this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.028)
    } catch (e) {}
  }

  // Silent or whisper-soft tactile pulse on manual blink
  // NOTE: Automated blink loop no longer spams loud beeps
  playBlink(epoch = 1) {
    // Keep it whisper-soft and gentle, so it never irritates the user
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return
    try {
      const now = this.ctx.currentTime
      const freqs = [330.0, 392.0, 440.0] // E4, G4, A4 (warm octave lower)
      const freq = freqs[(epoch - 1) % freqs.length]

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.012, now) // Very low amplitude
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)

      osc.connect(gain)
      gain.connect(this.masterGain || this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.045)
    } catch (e) {}
  }

  // Soft radar lock confirmation
  playLock() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return
    try {
      const now = this.ctx.currentTime
      const notes = [440.0, 659.25] // A4 -> E5 (Harmonic fifth)
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.06)

        gain.gain.setValueAtTime(0.045, now + idx * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.18)

        osc.connect(gain)
        gain.connect(this.masterGain || this.ctx.destination)
        osc.start(now + idx * 0.06)
        osc.stop(now + idx * 0.06 + 0.2)
      })
    } catch (e) {}
  }

  // Harmonic discovery triumph swell (resonant major chord bloom)
  playTriumph() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return
    try {
      const now = this.ctx.currentTime
      // Fmaj9 celestial chord: F4, A4, C5, E5, G5
      const notes = [349.23, 440.0, 523.25, 659.25, 783.99]
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.05)

        gain.gain.setValueAtTime(0.0001, now + idx * 0.05)
        gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.05 + 0.08)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.8)

        osc.connect(gain)
        gain.connect(this.masterGain || this.ctx.destination)
        if (this.delayNode) gain.connect(this.delayNode)

        osc.start(now + idx * 0.05)
        osc.stop(now + idx * 0.05 + 0.85)
      })
    } catch (e) {}
  }
}

export const soundEngine = new SoundEngine()
