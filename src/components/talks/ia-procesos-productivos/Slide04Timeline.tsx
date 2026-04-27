import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

const milestones = [
  { year: '2020', label: 'GPT-3', color: '#0891b2' },
  { year: '2022', label: 'ChatGPT', color: '#00d4ff' },
  { year: '2024', label: 'Agentes autónomos', color: '#a855f7' },
  { year: '2025', label: 'MCP estándar', color: '#ec4899' },
  { year: '2026', label: '41% código IA', color: '#06d6a0' },
];

const pastIcons = [
  { label: 'Fábricas manuales', icon: '🏭' },
  { label: 'Papeles', icon: '📋' },
  { label: 'Teléfonos', icon: '☎️' },
  { label: 'Hojas de cálculo', icon: '📊' },
];

const futureIcons = [
  { label: 'Agentes IA', icon: '🤖' },
  { label: 'Dashboards', icon: '📡' },
  { label: 'Automatización', icon: '⚡' },
  { label: 'Tiempo real', icon: '🔮' },
];

export default function Slide04Timeline(): ReactNode {
  const [visibleMilestones, setVisibleMilestones] = useState(0);

  useEffect(() => {
    const timers = milestones.map((_, i) =>
      setTimeout(() => setVisibleMilestones(i + 1), 800 + i * 600)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="slide">
      <div className="slide-inner" style={{
        maxWidth: '1200px',
        padding: '0 clamp(0.75rem, 3vw, 2rem)',
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="slide-label"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.5rem)' }}
        >
          La revolución en 6 años
        </motion.div>

        {/* Split screen */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(1rem, 2.5vw, 2rem)',
          width: '100%',
          marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
        }}>
          {/* 2020 side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              padding: 'clamp(1rem, 2.5vw, 2.5rem)',
              borderRadius: '16px',
              background: 'var(--color-slide-surface)',
              border: '1px solid var(--color-slide-border)',
              textAlign: 'center',
            }}
          >
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 5rem)',
              color: '#ffffff',
              fontWeight: 700,
              marginBottom: 'clamp(0.75rem, 1.5vw, 1.5rem)',
            }}>2020</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
              {pastIcons.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  style={{
                    padding: 'clamp(0.5rem, 1vw, 1.25rem)',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    fontSize: 'clamp(0.75rem, 1.8vw, 1.5rem)',
                    color: 'var(--color-ignite-text-primary)',
                  }}
                >
                  <div style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)', marginBottom: '0.25rem' }}>{item.icon}</div>
                  {item.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 2026 side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              padding: 'clamp(1rem, 2.5vw, 2.5rem)',
              borderRadius: '16px',
              background: 'var(--color-slide-surface)',
              border: '1px solid rgba(0,212,255,0.2)',
              textAlign: 'center',
              boxShadow: '0 0 40px rgba(0,212,255,0.05)',
            }}
          >
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 5rem)',
              fontWeight: 700,
              marginBottom: 'clamp(0.75rem, 1.5vw, 1.5rem)',
              color: 'var(--neon-cyan)',
            }}>2026</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
              {futureIcons.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  style={{
                    padding: 'clamp(0.5rem, 1vw, 1.25rem)',
                    borderRadius: '10px',
                    background: 'rgba(0,212,255,0.05)',
                    fontSize: 'clamp(0.75rem, 1.8vw, 1.5rem)',
                    color: 'var(--color-ignite-text-primary)',
                  }}
                >
                  <div style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)', marginBottom: '0.25rem' }}>{item.icon}</div>
                  {item.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline — alternating above/below */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(120px, 18vw, 220px)',
          padding: '0 clamp(0.5rem, 2vw, 1.5rem)',
        }}>
          {/* Line — centered vertically */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 'clamp(0.5rem, 2vw, 1.5rem)',
            right: 'clamp(0.5rem, 2vw, 1.5rem)',
            height: 'clamp(2px, 0.3vw, 3px)',
            background: 'var(--color-slide-border)',
            transform: 'translateY(-50%)',
            zIndex: 0,
          }} />

          {/* Dots row */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
            zIndex: 1,
          }}>
            {milestones.map((m, i) => {
              const isAbove = i % 2 !== 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={i < visibleMilestones ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Labels above (for odd items) */}
                  {isAbove && (
                    <div style={{
                      position: 'absolute',
                      bottom: '50%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'clamp(0.1rem, 0.3vw, 0.2rem)',
                      paddingBottom: 'clamp(14px, 2.5vw, 28px)',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.7rem, 1.8vw, 1.7rem)',
                        color: 'var(--color-ignite-text-primary)',
                        whiteSpace: 'nowrap',
                        opacity: 0.85,
                      }}>{m.label}</span>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(1.1rem, 2.8vw, 2.4rem)',
                        color: m.color,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}>{m.year}</span>
                    </div>
                  )}

                  {/* Dot — always centered */}
                  <div style={{
                    width: 'clamp(16px, 3vw, 36px)',
                    height: 'clamp(16px, 3vw, 36px)',
                    borderRadius: '50%',
                    background: m.color,
                    boxShadow: `0 0 14px ${m.color}50`,
                    flexShrink: 0,
                  }} />

                  {/* Labels below (for even items) */}
                  {!isAbove && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'clamp(0.1rem, 0.3vw, 0.2rem)',
                      paddingTop: 'clamp(14px, 2.5vw, 28px)',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(1.1rem, 2.8vw, 2.4rem)',
                        color: m.color,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}>{m.year}</span>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.7rem, 1.8vw, 1.7rem)',
                        color: 'var(--color-ignite-text-primary)',
                        whiteSpace: 'nowrap',
                        opacity: 0.85,
                      }}>{m.label}</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
