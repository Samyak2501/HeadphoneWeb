import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeadphoneModelProps {
  color: 'silver' | 'gray' | 'obsidian';
  scrollGroupRef: React.RefObject<THREE.Group | null>;
}

// Color palettes matching premium dark theme luxury aesthetic
const colorPalettes = {
  silver: {
    leather: '#ececed',
    metal: '#d1d1d6',
    body: '#e5e5e7',
    roughnessLeather: 0.65,
    metalnessLeather: 0.05,
    roughnessMetal: 0.2,
    metalnessMetal: 0.95,
    roughnessBody: 0.35,
    metalnessBody: 0.7
  },
  gray: {
    leather: '#3a3a3c',
    metal: '#636366',
    body: '#48484a',
    roughnessLeather: 0.6,
    metalnessLeather: 0.1,
    roughnessMetal: 0.25,
    metalnessMetal: 0.9,
    roughnessBody: 0.4,
    metalnessBody: 0.65
  },
  obsidian: {
    leather: '#18181a',
    metal: '#2c2c2e',
    body: '#121212',
    roughnessLeather: 0.7,
    metalnessLeather: 0.05,
    roughnessMetal: 0.3,
    metalnessMetal: 0.85,
    roughnessBody: 0.45,
    metalnessBody: 0.5
  }
};

export const HeadphoneModel: React.FC<HeadphoneModelProps> = ({ color, scrollGroupRef }) => {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}headphone.glb`);
  const mouseYawGroupRef = useRef<THREE.Group>(null);
  const mousePitchGroupRef = useRef<THREE.Group>(null);
  const floatGroupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Clone, auto-center, and normalize the scene's scale to exactly 1.0 unit max dimension
  const normalizedScene = useMemo(() => {
    const clone = scene.clone();
    
    // 1. Calculate bounding box of the imported model
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    
    // 2. Subtract the center to shift the geometry center exactly to the origin (0, 0, 0)
    clone.position.sub(center);
    
    // 3. Normalize the scale so the largest dimension is exactly 1.0 units
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scaleFactor = 1.0 / maxDim;
      clone.scale.multiplyScalar(scaleFactor);
      
      // Shift position must also be scaled by the scaleFactor
      clone.position.multiplyScalar(scaleFactor);
    }
    
    return clone;
  }, [scene]);

  // Track mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update material colors and properties based on chosen active color scheme
  useEffect(() => {
    const palette = colorPalettes[color];
    
    // Diagnostic bounding box inspection after normalization
    const box = new THREE.Box3().setFromObject(normalizedScene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    console.log("--- 3D MODEL DIAGNOSTICS (NORMALIZED) ---");
    console.log(`Normalized bounding size: [X: ${size.x.toFixed(4)}, Y: ${size.y.toFixed(4)}, Z: ${size.z.toFixed(4)}]`);
    console.log(`Normalized center offset: [X: ${center.x.toFixed(4)}, Y: ${center.y.toFixed(4)}, Z: ${center.z.toFixed(4)}]`);
    
    normalizedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        console.log(`Mesh: "${child.name}", Visible: ${child.visible}, Geometry vertices: ${child.geometry.attributes.position.count}`);

        // Ensure materials are unique before modifying color
        if (child.material) {
          const mat = child.material = child.material.clone();
          const matName = mat.name;

          if (matName === 'White_leather' || matName.includes('leather')) {
            mat.color.set(palette.leather);
            mat.roughness = palette.roughnessLeather;
            mat.metalness = palette.metalnessLeather;
          } else if (matName === 'Worn_Yellow_Brass_Metal' || matName.includes('Metal') || matName.includes('Brass')) {
            mat.color.set(palette.metal);
            mat.roughness = palette.roughnessMetal;
            mat.metalness = palette.metalnessMetal;
          } else if (matName === 'Material.001' || matName.includes('001') || matName.includes('Material')) {
            mat.color.set(palette.body);
            mat.roughness = palette.roughnessBody;
            mat.metalness = palette.metalnessBody;
          }
        }
      }
    });
  }, [normalizedScene, color]);

  // Handle subtle float and cursor-following rotation with inertia
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Mouse rotation - active in Hero, decays as scroll down
    if (mouseYawGroupRef.current && mousePitchGroupRef.current) {
      const scrollPercent = Math.min(1, window.scrollY / window.innerHeight);
      const mouseInfluence = Math.max(0, 1 - scrollPercent); // Fade out mouse influence as we scroll down Features

      // Check if mouse is hovering over the headphone in the Hero section (using elliptical bounding area adjusted to model position)
      const hoverRadiusX = 0.40;
      const hoverRadiusY = 0.65;
      const hoverCenterY = 0.08;
      
      const dx = mouse.current.x;
      const dy = mouse.current.y - hoverCenterY;
      
      const isOverModel = 
        (dx * dx) / (hoverRadiusX * hoverRadiusX) + 
        (dy * dy) / (hoverRadiusY * hoverRadiusY) <= 1.0;

      // Tilts only when cursor is over the model, with high-impact rotation tilt
      const targetRotZ = isOverModel ? -mouse.current.y * 1.40 * mouseInfluence : 0;
      const targetRotY = isOverModel ? mouse.current.x * 1.80 * mouseInfluence : 0;

      // Separate yaw and pitch to prevent roll/tilting, applying a slower, smoother return speed when releasing hover
      const lerpSpeed = isOverModel ? 0.08 : 0.04;
      mouseYawGroupRef.current.rotation.y += (targetRotY - mouseYawGroupRef.current.rotation.y) * lerpSpeed;
      mousePitchGroupRef.current.rotation.z += (targetRotZ - mousePitchGroupRef.current.rotation.z) * lerpSpeed;
    }

    // 2. Sine-wave idle float animation
    if (floatGroupRef.current) {
      floatGroupRef.current.position.y = Math.sin(time * 1.5) * 0.05;
    }
  });

  return (
    <group ref={scrollGroupRef}>
      <group ref={mouseYawGroupRef}>
        <group ref={mousePitchGroupRef}>
          <group ref={floatGroupRef}>
            <primitive object={normalizedScene} />
          </group>
        </group>
      </group>
    </group>
  );
};

// Pre-load the GLTF asset so it starts downloading immediately
useGLTF.preload(`${import.meta.env.BASE_URL}headphone.glb`);
