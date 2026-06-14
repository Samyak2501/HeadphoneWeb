import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

export const Loader: React.FC = () => {
  const { active, progress } = useProgress();
  const [shouldShow, setShouldShow] = useState(true);
  const [displayPercent, setDisplayPercent] = useState(0);

  // 1. Smooth out the percentage counter based on Drei progress
  useEffect(() => {
    let animationFrameId: number;
    const target = Math.round(progress);
    
    const updatePercent = () => {
      setDisplayPercent((prev) => {
        if (prev < target) {
          const diff = target - prev;
          const step = Math.max(1, Math.ceil(diff * 0.1));
          animationFrameId = requestAnimationFrame(updatePercent);
          return prev + step;
        }
        return target;
      });
    };

    updatePercent();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [progress]);

  // 2. Fail-safe: if active is false after 1.2s (e.g. cached model or no loading triggered), count up smoothly to 100
  useEffect(() => {
    const activeTimeout = setTimeout(() => {
      if (!active) {
        const animateTo100 = () => {
          setDisplayPercent((prev) => {
            if (prev < 100) {
              const diff = 100 - prev;
              const step = Math.max(2, Math.ceil(diff * 0.15));
              requestAnimationFrame(animateTo100);
              return prev + step;
            }
            return 100;
          });
        };
        animateTo100();
      }
    }, 1200);

    return () => clearTimeout(activeTimeout);
  }, [active]);

  // 3. Absolute fail-safe: force hide the preloader under any circumstances after 8 seconds
  useEffect(() => {
    const forceHideTimeout = setTimeout(() => {
      setShouldShow(false);
    }, 8000);

    return () => clearTimeout(forceHideTimeout);
  }, []);

  // 4. Hide loader once progress reaches 100%
  useEffect(() => {
    if (displayPercent >= 100) {
      const timeout = setTimeout(() => {
        setShouldShow(false);
      }, 800); // Hold at 100% briefly for a premium aesthetic feel
      return () => clearTimeout(timeout);
    }
  }, [displayPercent]);

  // 5. Disable scrolling while the preloader is showing
  useEffect(() => {
    if (shouldShow) {
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100vh';
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [shouldShow]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#050505',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Ambient Background Radial Glow */}
          <div
            style={{
              position: 'absolute',
              width: '60vw',
              height: '60vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#8a8a93',
                marginBottom: '20px'
              }}
            >
              Acoustic Precision
            </motion.div>

            {/* The Percentage Counter */}
            <motion.div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(72px, 12vw, 150px)',
                fontWeight: 900,
                letterSpacing: '-6px',
                lineHeight: 1,
                background: 'linear-gradient(180deg, #ffffff 40%, #222225 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              {displayPercent}%
            </motion.div>

            {/* Premium progress bar */}
            <div
              style={{
                width: '240px',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                margin: '30px auto 0',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  width: `${displayPercent}%`,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                }}
              />
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              color: '#4e4e52',
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
            }}
          >
            Loading Experience
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
