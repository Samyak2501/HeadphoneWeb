import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SmokeParticles } from './SmokeParticles';
import { HeadphoneModel } from './HeadphoneModel';
import { ScrollController } from './ScrollController';
import * as THREE from 'three';

interface CanvasContainerProps {
  color: 'silver' | 'gray' | 'obsidian';
  scrollGroupRef: React.RefObject<THREE.Group | null>;
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({ color, scrollGroupRef }) => {
  return (
    <div className="canvas-container">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        {/* Cinematic atmospheric fog */}
        <fog attach="fog" args={['#050505', 4.5, 9.5]} />

        {/* Ambient lighting to soften the shadows */}
        <ambientLight intensity={0.4} />

        {/* Studio Key Light (Top-Front-Right) */}
        <directionalLight
          position={[5, 6, 4]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />

        {/* Strong Rim Light from Back-Left to highlight the metal edges & curves */}
        <directionalLight
          position={[-6, 4, -5]}
          intensity={3.8}
          color="#ffffff"
        />

        {/* Warm Fill Light from underneath */}
        <pointLight
          position={[0, -4, 2]}
          intensity={1.5}
          color="#55555e"
        />

        {/* Soft volumetric smoke particles flowing behind the headphone */}
        <SmokeParticles count={70} />

        {/* Persistent 3D headphone model */}
        <Suspense fallback={null}>
          <HeadphoneModel color={color} scrollGroupRef={scrollGroupRef} />
          <ScrollController scrollGroupRef={scrollGroupRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};
