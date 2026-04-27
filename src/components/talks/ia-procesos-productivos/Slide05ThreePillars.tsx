import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

const pillars = [
  {
    icon: '🔮',
    title: 'Predecir',
    subtitle: 'Mantenimiento predictivo',
    color: '#00d4ff',
    bg: 'rgba(0,212,255,0.08)',
    border: 'rgba(0,212,255,0.2)',
  },
  {
    icon: '👁️',
    title: 'Ver',
    subtitle: 'Visión artificial',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.2)',
  },
  {
    icon: '🤖',
    title: 'Actuar',
    subtitle: 'Agentes autónomos',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.08)',
    border: 'rgba(236,72,153,0.2)',
  },
];

export default function Slide05ThreePillars(): ReactNode {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = pillars.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 400 + i * 700)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{`
        .pillars-row {
          display: flex;
          flex-direction: row;
          gap: clamp(1rem, 3vw, 2.5rem);
          width: 100%;
          max-width: 1100px;
          margin-top: clamp(0.75rem, 2vw, 2rem);
        }
        .pillars-row > * {
          flex: 1 1 0;
          min-width: 0;
        }
        @media (max-width: 600px) {
          .pillars-row {
            flex-direction: column;
            align-items: center;
            gap: clamp(0.75rem, 2vw, 1.5rem);
          }
          .pillars-row > * {
            width: 100%;
            max-width: 320px;
          }
        }
      `}</style>
      <div className="slide">
        <div className="slide-inner" style={{ padding: '0 clamp(1rem, 4vw, 2rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="slide-label"
          >
            Los 3 pilares de la IA en producción
          </motion.div>

          <div className="pillars-row">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={i < visible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  padding: 'clamp(1.2rem, 2.5vw, 2rem)',
                  borderRadius: '20px',
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem, 1.5vw, 1rem)',
                }}
              >
                <div style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>{p.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 4vw, 3.5rem)',
                  fontWeight: 700,
                  color: p.color,
                  textAlign: 'center',
                }}>{p.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.8rem, 2vw, 1.5rem)',
                  color: '#ffffff',
                  textAlign: 'center',
                }}>{p.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
