import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Volume2 } from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// 1. Hero Section Component
export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="hero-section">
      <header className="hero-header">
        <a href="#" className="logo">AERO</a>
        <nav className="hero-nav">
          <a href="#features" className="nav-link">Design</a>
          <a href="#tech" className="nav-link">Technology</a>
          <a href="#showcase" className="nav-link">Showcase</a>
        </nav>
      </header>

      {/* Huge subtle watermark title in the background behind the headphone */}
      <div className="hero-watermark-container">
        <motion.h1 
          className="hero-watermark-text"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          AERO
        </motion.h1>
      </div>

      {/* Flex spacer to absorb center height and push content to bottom */}
      <div style={{ flex: 1, pointerEvents: 'none' }} />

      {/* Content pushed to the bottom of the viewport */}
      <div className="hero-bottom-content">
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          Redefining acoustic luxury. Immersive cinema sound with hybrid noise cancellation, sculpted in brushed metal.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <a href="#cta" className="btn-primary">Experience Aero</a>
        </motion.div>
      </div>

      <div className="hero-footer">
        <span>Acoustic Craftsmanship</span>
        <span>Scroll to Explore</span>
        <span>Aero One Edition</span>
      </div>
    </section>
  );
};

// 2. Features Section Component
export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="features-section">
      <motion.div 
        className="features-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div>
          <span className="section-label">Aesthetic & Form</span>
          <h2 className="section-title">Designed for Complete Immersion</h2>
        </div>

        <div className="feature-cards-container">
          <motion.div className="glass-panel feature-card" variants={fadeInUp}>
            <div className="feature-icon-wrapper">
              <Sparkles size={20} />
            </div>
            <div className="feature-info">
              <h3>Sculpted Anodized Shells</h3>
              <p>Each ear cup is precision-milled from raw aluminum, sandblasted for a luxurious matte finish, and coated with an anti-fingerprint layer.</p>
            </div>
          </motion.div>

          <motion.div className="glass-panel feature-card" variants={fadeInUp}>
            <div className="feature-icon-wrapper">
              <Shield size={20} />
            </div>
            <div className="feature-info">
              <h3>Pressure-Free Memory Cushions</h3>
              <p>Wrapped in bespoke protein leather, our memory foam cushions adapt perfectly to your unique ear geometry for absolute, all-day comfort.</p>
            </div>
          </motion.div>

          <motion.div className="glass-panel feature-card" variants={fadeInUp}>
            <div className="feature-icon-wrapper">
              <Volume2 size={20} />
            </div>
            <div className="feature-info">
              <h3>Acoustical Geometry</h3>
              <p>Specially calculated ear cup chambers isolate external sound waves passively while allowing deep bass currents to expand without distortion.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div style={{ pointerEvents: 'none' }} /> {/* Empty placeholder for persistent 3D model */}
    </section>
  );
};

// 3. Technology Section Component
export const TechSection: React.FC = () => {
  return (
    <section id="tech" className="tech-section">
      <div className="tech-empty" style={{ pointerEvents: 'none' }} /> {/* Empty placeholder for persistent 3D model */}
      
      <motion.div 
        className="tech-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="glass-panel" style={{ padding: '30px', overflow: 'hidden' }}>
          <span className="section-label">Aero Lifestyle</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', marginBottom: '16px', lineHeight: 1.2 }}>
            Sculpted for the Streets
          </h2>
          <motion.p 
            style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px' }}
            variants={fadeInUp}
          >
            A perfect fusion of acoustic science and street couture. Engineered to look, feel, and sound like nothing else on the planet.
          </motion.p>
          <motion.img 
            src={`${import.meta.env.BASE_URL}ManWithHeadphone.png`} 
            alt="Aero Lifestyle" 
            className="tech-lifestyle-img"
            variants={fadeInUp}
            style={{ width: '100%' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// 4. Product Showcase Section Component
interface ShowcaseSectionProps {
  currentColor: 'silver' | 'gray' | 'obsidian';
  onColorChange: (color: 'silver' | 'gray' | 'obsidian') => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ currentColor, onColorChange }) => {
  const options: { id: 'silver' | 'gray' | 'obsidian'; name: string; hex: string; desc: string }[] = [
    { id: 'silver', name: 'Platinum Silver', hex: '#d1d1d6', desc: 'Sleek brushed metal with clean light accents.' },
    { id: 'gray', name: 'Space Gray', hex: '#636366', desc: 'Elegant graphite structure with deep charcoal cushioning.' },
    { id: 'obsidian', name: 'Obsidian Matte', hex: '#222222', desc: 'Stealth anodized body wrapped in jet black leather.' },
  ];

  return (
    <section id="showcase" className="showcase-section">
      <motion.div 
        className="showcase-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-label">Showcase</span>
        <h2 className="section-title">Personalize Your Sound</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Select a bespoke finish crafted from hand-polished aerospace aluminum. Each colorway matches premium tailoring.
        </p>
      </motion.div>

      <div className="showcase-panel glass-panel">
        <div>
          <span className="section-label" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Material Finishes</span>
          <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>Signature Coatings</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px' }}>
            Our electrostatic powder coats resist fingerprints, sweat, and micro-scratches. Click any option to dynamically adjust the headphone's materials.
          </p>
        </div>

        <div className="color-options">
          {options.map((opt) => (
            <div 
              key={opt.id}
              className={`color-option-row ${currentColor === opt.id ? 'active' : ''}`}
              onClick={() => onColorChange(opt.id)}
            >
              <div 
                className="color-circle" 
                style={{ backgroundColor: opt.hex }}
              />
              <div>
                <div className="color-name">{opt.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {opt.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Final CTA Section Component
export const CtaSection: React.FC = () => {
  return (
    <section id="cta" className="cta-section">
      <motion.div 
        className="cta-box"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <span className="section-label">Aero Acoustics</span>
        <h2 className="cta-title">HEAR EVERY DETAIL</h2>
        <div className="cta-price">$399.00 USD</div>
        <div>
          <button className="btn-primary">
            Order Aero One
          </button>
        </div>
      </motion.div>

      <footer className="footer">
        <a href="#" className="footer-logo">AERO</a>
        <div className="footer-links">
          <a href="#features" className="footer-link">Design</a>
          <a href="#tech" className="footer-link">Tech</a>
          <a href="#showcase" className="footer-link">Showcase</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-link">Github</a>
        </div>
        <div className="footer-copyright">
          © 2026 AERO Audio Labs. All rights reserved. Crafted for sound enthusiasts.
        </div>
      </footer>
    </section>
  );
};
