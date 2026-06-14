import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface ScrollControllerProps {
  scrollGroupRef: React.RefObject<THREE.Group | null>;
}

export const ScrollController: React.FC<ScrollControllerProps> = ({ scrollGroupRef }) => {
  useEffect(() => {
    const scrollGroup = scrollGroupRef.current;
    if (!scrollGroup) return;

    let ctx = gsap.context(() => {});

    const initScrollTrigger = () => {
      // Clean up previous animations if they exist
      ctx.revert();

      ctx = gsap.context(() => {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        // Coordinate configuration for different screens
        const posHero = isMobile ? [0, 0.22, 0] : isTablet ? [0, 0.12, 0] : [0, 0.15, 0];
        const rotHero = [0.1, 1.57, 0]; // 90 deg rotation for front orientation
        const scaleHero = isMobile ? [1.6, 1.6, 1.6] : isTablet ? [2.2, 2.2, 2.2] : [3.0, 3.0, 3.0];

        const posFeatures = isMobile 
          ? [0, 1.0, -0.4] 
          : isTablet ? [0.9, 0.1, -0.2] : [1.4, 0.1, -0.2];
        const rotFeatures = isMobile 
          ? [0.2, 0.8, 0.15] 
          : [0.15, 1.1, 0.1];
        const scaleFeatures = isMobile ? [1.3, 1.3, 1.3] : isTablet ? [2.2, 2.2, 2.2] : [3.2, 3.2, 3.2];

        const posTech = isMobile 
          ? [0, 1.0, -0.4] 
          : isTablet ? [-0.9, 0.1, -0.2] : [-1.4, 0.1, -0.2];
        const rotTech = isMobile 
          ? [0.35, -0.8, -0.15] 
          : [0.35, -1.1, -0.2];
        const scaleTech = isMobile ? [1.3, 1.3, 1.3] : isTablet ? [2.2, 2.2, 2.2] : [3.2, 3.2, 3.2];

        const posShowcase = isMobile 
          ? [0, 0.7, -0.1] 
          : isTablet ? [0, 0.2, 0.5] : [0, 0.15, 0.6];
        const rotShowcase = isMobile 
          ? [0.1, 6.28, 0.1] 
          : [0.15, 6.28, 0.1]; // Rotates a full 360 degrees
        const scaleShowcase = isMobile ? [1.5, 1.5, 1.5] : isTablet ? [2.4, 2.4, 2.4] : [3.5, 3.5, 3.5];

        const posCta = isMobile 
          ? [0, 0.35, 0.8] 
          : isTablet ? [0, -0.2, 1.6] : [0, -0.2, 1.8];
        const rotCta = isMobile 
          ? [0.2, 6.78, 0] 
          : [0.25, 6.78, 0]; // Continues rotation slightly
        const scaleCta = isMobile ? [1.1, 1.1, 1.1] : isTablet ? [1.7, 1.7, 1.7] : [2.0, 2.0, 2.0];

        // Set initial coordinates
        gsap.set(scrollGroup.position, { x: posHero[0], y: posHero[1], z: posHero[2] });
        gsap.set(scrollGroup.rotation, { x: rotHero[0], y: rotHero[1], z: rotHero[2] });
        gsap.set(scrollGroup.scale, { x: scaleHero[0], y: scaleHero[1], z: scaleHero[2] });

        // Master ScrollTrigger timeline linking page scrolling to model states
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.scroll-content',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5, // Dampening/lag feeling
            invalidateOnRefresh: true,
          }
        });

        // 1. Transition to Features (at 25% of timeline)
        tl.to(scrollGroup.position, {
          x: posFeatures[0],
          y: posFeatures[1],
          z: posFeatures[2],
          ease: 'power1.inOut',
        }, 'step1')
        .to(scrollGroup.rotation, {
          x: rotFeatures[0],
          y: rotFeatures[1],
          z: rotFeatures[2],
          ease: 'power1.inOut',
        }, 'step1')
        .to(scrollGroup.scale, {
          x: scaleFeatures[0],
          y: scaleFeatures[1],
          z: scaleFeatures[2],
          ease: 'power1.inOut',
        }, 'step1');

        // 2. Transition to Tech (at 50% of timeline)
        tl.to(scrollGroup.position, {
          x: posTech[0],
          y: posTech[1],
          z: posTech[2],
          ease: 'power1.inOut',
        }, 'step2')
        .to(scrollGroup.rotation, {
          x: rotTech[0],
          y: rotTech[1],
          z: rotTech[2],
          ease: 'power1.inOut',
        }, 'step2')
        .to(scrollGroup.scale, {
          x: scaleTech[0],
          y: scaleTech[1],
          z: scaleTech[2],
          ease: 'power1.inOut',
        }, 'step2');

        // 3. Transition to Showcase (at 75% of timeline)
        tl.to(scrollGroup.position, {
          x: posShowcase[0],
          y: posShowcase[1],
          z: posShowcase[2],
          ease: 'power1.inOut',
        }, 'step3')
        .to(scrollGroup.rotation, {
          x: rotShowcase[0],
          y: rotShowcase[1],
          z: rotShowcase[2],
          ease: 'power1.inOut',
        }, 'step3')
        .to(scrollGroup.scale, {
          x: scaleShowcase[0],
          y: scaleShowcase[1],
          z: scaleShowcase[2],
          ease: 'power1.inOut',
        }, 'step3');

        // 4. Transition to CTA (at 100% of timeline)
        tl.to(scrollGroup.position, {
          x: posCta[0],
          y: posCta[1],
          z: posCta[2],
          ease: 'power1.inOut',
        }, 'step4')
        .to(scrollGroup.rotation, {
          x: rotCta[0],
          y: rotCta[1],
          z: rotCta[2],
          ease: 'power1.inOut',
        }, 'step4')
        .to(scrollGroup.scale, {
          x: scaleCta[0],
          y: scaleCta[1],
          z: scaleCta[2],
          ease: 'power1.inOut',
        }, 'step4');
      });
    };

    initScrollTrigger();

    // Reinitialize on window resize to update target coordinates
    window.addEventListener('resize', initScrollTrigger);

    return () => {
      window.removeEventListener('resize', initScrollTrigger);
      ctx.revert();
    };
  }, [scrollGroupRef]);

  return null;
};
