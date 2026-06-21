# 🎧 AERO One — Acoustic Luxury 3D Experience

[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-r184-black?style=for-the-badge&logo=three.js)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite)](https://vite.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-green?style=for-the-badge&logo=greensock)](https://greensock.com)

A state-of-the-art, immersive 3D landing page showcasing the **AERO One** luxury headphones. This project blends high-end editorial web design with interactive WebGL, featuring a persistent 3D model that responds dynamically to user scroll and customizer input.

---

## 💻 Live Demo
- **Website Link**: https://aero-headphone.netlify.app/

## ✨ Immersive Features

- **Dynamic 3D Customizer**: Instantly switch headphone finishes in real-time between:
  - 🥈 **Platinum Silver**: Sleek brushed metal with clean light accents.
  - 🪙 **Space Gray**: Elegant graphite structure with deep charcoal cushioning.
  - 🕶️ **Obsidian Matte**: Stealth anodized body wrapped in jet black leather.
- **Cinematic Backdrop**: A high-fidelity ambient video layer blended seamlessly behind the 3D model using deep radial gradients.
- **Atmospheric Smoke Particles**: Custom WebGL smoke/dust particle system drifting behind the headphone model for added depth.
- **Micro-Animations & Transitions**: Fluid animations powered by **Framer Motion** and **GSAP** that react as you scroll through features.
- **Silk-Smooth Scrolling**: Integrated **Lenis** scroll controller to provide a premium, inertial-scrolling feel on all devices.
- **Luxury Preloader**: A progress-tracked overlay ensures all 3D assets (`.glb` models), custom SVG icons, and lifestyle imagery are fully loaded before revealing the interface.

---

## 🛠️ Tech Stack & Architecture

- **Framework & Language**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) via [React Three Fiber (R3F)](https://github.com/pmndrs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Smooth Scroll**: [@studio-freight/react-lenis](https://github.com/darkroomengineering/lenis)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP (GreenSock)](https://greensock.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```
├── public/
│   ├── headphone.glb        # High-fidelity 3D Headphone Model
│   ├── ManWithHeadphone.png # Lifestyle mockup image
│   └── icons.svg            # Custom SVG sprite
├── src/
│   ├── assets/              # UI images and static vectors
│   ├── components/
│   │   ├── CanvasContainer.tsx # Persistent R3F Canvas wrapper
│   │   ├── HeadphoneModel.tsx  # GLTF Model loader & material mapping
│   │   ├── SmokeParticles.tsx  # WebGL atmospheric particles
│   │   ├── ScrollController.tsx# GSAP timeline linking scroll to 3D camera
│   │   ├── Loader.tsx          # Cinematic pre-loader with percentage progress
│   │   └── Sections.tsx        # HTML Content layout sections (Hero, Features, Tech, Showcase, CTA)
│   ├── App.tsx              # Main orchestrator & state manager
│   ├── index.css            # Custom CSS and glassmorphic variables
│   └── main.tsx             # React entrypoint
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Samyak2501/HeadphoneWeb.git
   cd HeadphoneWeb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Spin up the development server:
   ```bash
   npm run dev
   ```
   The application will run locally at `http://localhost:5173`.

### Production Build

To build the project for production, run:
```bash
npm run build
```
This generates a static production bundle in the `dist/` directory, optimized and ready to be hosted on Netlify, Vercel, or GitHub Pages.

---

## 📄 License

This project is licensed under the MIT License. Crafted with 🤍 for sound enthusiasts.
