import React, { useState, useRef } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Loader } from './components/Loader';
import { CanvasContainer } from './components/CanvasContainer';
import {
  HeroSection,
  FeaturesSection,
  TechSection,
  ShowcaseSection,
  CtaSection
} from './components/Sections';
import * as THREE from 'three';

const App: React.FC = () => {
  // Color picker state: Silver, Space Gray, Obsidian
  const [headphoneColor, setHeadphoneColor] = useState<'silver' | 'gray' | 'obsidian'>('silver');
  
  // Persistent 3D model scroll-linked reference
  const scrollGroupRef = useRef<THREE.Group>(null);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {/* Luxury Preloader */}
      <Loader />

      {/* Cinematic Video Background (rendered globally behind Canvas) */}
      <div className="hero-video-container">
        <video 
          className="hero-video" 
          src="https://res.cloudinary.com/dvajzxiy2/video/upload/lv_0_20260613195719_zinaz1.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
        />
      </div>

      {/* Persistent 3D R3F Canvas Container */}
      <CanvasContainer color={headphoneColor} scrollGroupRef={scrollGroupRef} />

      {/* Scrollable HTML Content */}
      <div className="scroll-content">
        <HeroSection />
        
        <FeaturesSection />
        
        <TechSection />
        
        <ShowcaseSection 
          currentColor={headphoneColor} 
          onColorChange={setHeadphoneColor} 
        />
        
        <CtaSection />
      </div>
    </ReactLenis>
  );
};

export default App;
