import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

const roles = [
  { year: '2023', role: 'Prompt Engineer', salary: '$45-80K USD', color: '#00d4ff' },
  { year: '2024', role: 'AI Agent Developer', salary: '$60-120K USD', color: '#a855f7' },
  { year: '2025', role: 'MCP Integration Specialist', salary: '$70-130K USD', color: '#ec4899' },
  { year: '2026', role: 'AI Orchestration Engineer', salary: '$80-150K USD', color: '#06d6a0' },
];

function AnimatedSalary({ text, delay }: { text: string; delay: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!show) return null;
  return (
    <motion.span
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.65rem, 1.4vw, 1.2rem)', color: 'var(--neon-green)' }}
    >
      {text}
    </motion.span>
  );
}

export default function Slide17NewJobs(): ReactNode {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = roles.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 500 + i * 700)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '800px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label">
          El mercado laboral
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
          Trabajos que <span style={{ color: 'var(--neon-pink)' }}>no existían</span>
        </motion.h2>

        {/* Timeline */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
          position: 'relative',
          paddingLeft: 'clamp(1.5rem, 3vw, 2rem)',
        }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '0.5rem',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'var(--color-slide-border)',
          }} />

          {roles.map((role, i) => (
            <motion.div
              key={role.role}
              initial={{ opacity: 0, x: -20 }}
              animate={i < visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.75rem, 2vw, 1rem)',
                position: 'relative',
              }}
            >
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: 'clamp(-1.125rem, -2vw, -1.625rem)',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: i < visible ? role.color : 'var(--color-slide-border)',
                boxShadow: i < visible ? `0 0 10px ${role.color}40` : 'none',
                transition: 'all 0.5s ease',
              }} />

              {/* Card */}
              <div style={{
                flex: 1,
                padding: 'clamp(0.625rem, 1.5vw, 0.875rem) clamp(0.75rem, 2vw, 1.25rem)',
                background: i < visible ? `${role.color}08` : 'var(--color-slide-surface)',
                border: `1px solid ${i < visible ? `${role.color}25` : 'var(--color-slide-border)'}`,
                borderRadius: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                transition: 'all 0.5s ease',
              }}>
                <div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.6rem, 1.3vw, 1.1rem)',
                    color: role.color,
                    fontWeight: 600,
                  }}>{role.year}</span>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(0.95rem, 2.5vw, 2rem)',
                    color: 'var(--color-ignite-text-primary)',
                    fontWeight: 600,
                  }}>{role.role}</div>
                </div>
                <AnimatedSalary text={role.salary} delay={800 + i * 700} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.7rem, 1.4vw, 1.4rem)',
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          Lo importante no es memorizar tecnologías — es aprender a aprender
        </motion.p>
      </div>
    </div>
  );
}
