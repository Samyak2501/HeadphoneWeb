import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SmokeParticlesProps {
  count?: number;
}

export const SmokeParticles: React.FC<SmokeParticlesProps> = ({ count = 60 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate a soft radial texture programmatically
  const smokeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      // Soft luxury silver-gray smoke
      gradient.addColorStop(0, 'rgba(240, 240, 245, 0.15)');
      gradient.addColorStop(0.2, 'rgba(230, 230, 235, 0.08)');
      gradient.addColorStop(0.6, 'rgba(200, 200, 205, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // Pre-calculate positions, speeds, scales, and ages
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        // Start particles spread out across the screen
        x: (Math.random() - 0.5) * 8 - 2, // Bias slightly left
        y: (Math.random() - 0.5) * 3,
        z: -2.5 - Math.random() * 2, // Strictly behind the headphone (z is -2.5 to -4.5)
        vx: 0.003 + Math.random() * 0.006, // Horizontal flow speed (left to right)
        vy: (Math.random() - 0.5) * 0.002, // Drift up/down
        size: 2.5 + Math.random() * 2.5,
        age: Math.random(), // Phase offset
        life: 0.8 + Math.random() * 0.4,
      });
    }
    return data;
  }, [count]);

  // Create initial geometry arrays
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    
    particleData.forEach((p, i) => {
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
      sz[i] = p.size;
    });

    return [pos, sz];
  }, [particleData, count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const data = particleData[i];
      
      // Update particle state
      data.x += data.vx;
      data.y += data.vy;
      
      // Slowly rise or wave
      data.y += Math.sin(time * 0.5 + i) * 0.001;

      // Wrap around if it goes too far right
      if (data.x > 5) {
        data.x = -5; // Respawn far left
        data.y = (Math.random() - 0.5) * 3;
        data.vx = 0.003 + Math.random() * 0.006;
      }

      posAttr.setXYZ(i, data.x, data.y, data.z);
    }
    
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={smokeTexture}
        transparent={true}
        depthWrite={false}
        blending={THREE.NormalBlending}
        size={3.0} // Control standard scaling
        sizeAttenuation={true}
      />
    </points>
  );
};
