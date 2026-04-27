import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

const demands = ['Nearshoring', 'Industria 4.0', 'Trazabilidad', 'Calidad automatizada'];
const realities = ['Baja digitalización', 'Brecha de talento', 'PyMEs sin datos', 'Infraestructura limitada'];

export default function Slide13Paradox(): ReactNode {
  const [tilt, setTilt] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setTilt(1), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '900px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label">
          El desbalance
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 7vw, 5rem)',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          La Paradoja Mexicana
        </motion.h2>

        {/* Scale visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ position: 'relative', width: '100%', maxWidth: '700px', margin: '0 auto' }}
        >
          {/* Fulcrum */}
          <div style={{
            width: '0',
            height: '0',
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderBottom: '20px solid var(--color-slide-border)',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
          }} />

          {/* Beam */}
          <motion.div
            animate={{ rotate: tilt ? (isMobile ? 4 : 12) : 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: 'clamp(1rem, 3vw, 2rem)',
              transformOrigin: 'center top',
              marginTop: '-2px',
            }}
          >
            {/* Left pan: What the world demands */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              style={{
                padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.15)',
                borderRadius: '16px',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                color: 'var(--neon-cyan)',
                fontWeight: 600,
                marginBottom: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                textAlign: 'center',
              }}>
                Lo que el mundo nos pide
              </h3>
              {demands.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.15 }}
                  style={{
                    padding: 'clamp(0.25rem, 0.75vw, 0.375rem) clamp(0.4rem, 1vw, 0.625rem)',
                    marginBottom: 'clamp(0.25rem, 0.75vw, 0.375rem)',
                    borderRadius: '8px',
                    background: 'rgba(0,212,255,0.06)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.85rem, 1.8vw, 1.5rem)',
                    color: 'var(--color-ignite-text-primary)',
                    textAlign: 'center',
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>

            {/* Right pan: What we have */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              style={{
                padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                background: 'rgba(239,68,68,0.05)',
                border: '1px solid rgba(239,68,68,0.15)',
                borderRadius: '16px',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                color: 'var(--neon-red)',
                fontWeight: 600,
                marginBottom: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                textAlign: 'center',
              }}>
                Lo que tenemos
              </h3>
              {realities.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.15 }}
                  style={{
                    padding: 'clamp(0.25rem, 0.75vw, 0.375rem) clamp(0.4rem, 1vw, 0.625rem)',
                    marginBottom: 'clamp(0.25rem, 0.75vw, 0.375rem)',
                    borderRadius: '8px',
                    background: 'rgba(239,68,68,0.06)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.85rem, 1.8vw, 1.5rem)',
                    color: '#ffffff',
                    textAlign: 'center',
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.7rem, 1.4vw, 1.4rem)',
            color: '#ffffff',
            textAlign: 'center',
            maxWidth: '600px',
          }}
        >
          99.8% de empresas son PyMEs — Solo 5.8% tiene IA integrada
          <br />
          <span style={{ color: 'var(--neon-amber)', fontSize: 'clamp(0.55rem, 1.2vw, 1.1rem)' }}>— BBVA Research / La Jornada, abril 2026</span>
        </motion.p>
      </div>
    </div>
  );
}
