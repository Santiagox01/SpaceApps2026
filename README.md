# SPHEREx | The Hunt for Planet Nine
> **NASA International Space Apps Challenge 2026**  
> *Interactive Citizen Science & Deep-Space Infrared Exploration Platform*

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.js.org/)
[![NASA SPHEREx](https://img.shields.io/badge/Mission-NASA%20SPHEREx-0B3D91?logo=nasa&logoColor=white)](https://spherex.caltech.edu/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Project Overview

**SPHEREx: The Hunt for Planet Nine** is an immersive scientific exploration platform developed for the NASA Space Apps Challenge 2026. Leveraging the capabilities of NASA's **SPHEREx** (Spectro-Photometer for the History of the Universe, Epoch of Reionization, and Ices Explorer) space telescope, this platform enables researchers, students, and citizen scientists to hunt for the elusive hypothesized Planet Nine at the outer edges of our Solar System.

Combining 102 near-infrared spectral bands (0.75 – 5.0 µm) with celestial mechanics simulations, the application transforms raw astrophysical data into an intuitive, visually stunning laboratory.

---

## Key Features

### 1. Interactive 4-Act Scrollytelling Narrative
A cinematic, scroll-driven storytelling experience guiding users through the science behind the hunt:
- **Act I — The Gravitational Phantom**: Visualizes Kuiper Belt Objects (KBOs) orbital clustering and gravitational anomalies caused by a hypothesized 5–10 Earth-mass planet.
- **Act II — The Thermal Infrared Signature**: Explains blackbody radiation in the infrared regime ($T \approx 30\text{--}45\,\text{K}$), showing why optical telescopes miss Planet Nine while SPHEREx excels.
- **Act III — The 102-Band Spectral Fingerprint**: Demonstrates atmospheric spectroscopy (Methane $\text{CH}_4$, Water-ice, and Hydrogen-Helium envelope absorption).
- **Act IV — Candidate Verification & Parallax**: Simulates SPHEREx's 6-month cadence parallax blink comparator to distinguish moving outer Solar System objects from stationary background stars.

### 2. Mission Control Research Suite
- **Planet Nine Orbital Simulator**: Real-time N-body gravitational perturbation sandbox with configurable mass ($M_\oplus$), semi-major axis ($a$), and eccentricity ($e$).
- **Telescope HUD & Parallax Blink Comparator**: Switch between Epoch A / Epoch B infrared captures with blink comparison, candidate tagging, and SNR metrics.
- **Spectroscopy HUD**: Multi-band infrared spectral signature breakdown across all 102 SPHEREx spectral channels.
- **NASA IRSA / TAP Query Engine**: Virtual Astronomical Data query interface simulating ADQL/TAP requests to Caltech/IPAC IRSA catalogs.
- **Interactive All-Sky SPHEREx Survey Map**: Real-time projection of celestial survey sectors with candidate overlays.
- **Cosmic Ambient Sound Engine**: Synthesized Web Audio API soundscapes featuring ambient cosmic pads and authentic telemetry frequencies.

---

## Technology Stack

- **Frontend**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **UI & Design System**: Custom Vanilla CSS with Deep-Space glassmorphism, HUD telemetry overlays, responsive layouts, and fluid micro-animations
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visual FX**: Custom Canvas Renderers & [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Audio Engine**: Pure Web Audio API synthesizers (OscillatorNodes, BiquadFilterNodes, GainNodes)
- **Bilingual Support**: Instant runtime toggle between English (`EN`) and Spanish (`ES`)

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   cd <YOUR_REPO_NAME>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Production assets will be generated in the `dist/` directory.

---

## Scientific References

- **NASA SPHEREx Mission**: [https://spherex.caltech.edu/](https://spherex.caltech.edu/)
- **Batygin, K., & Brown, M. E. (2016)**: *Evidence for a Distant Giant Planet in the Solar System*. The Astronomical Journal.
- **NASA IRSA (Infrared Science Archive)**: [https://irsa.ipac.caltech.edu/](https://irsa.ipac.caltech.edu/)

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
