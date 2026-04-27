import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';


const actions = [
  {
    title: 'Aprende los fundamentos de programación',
    description: 'Entiende lógica, variables, funciones y estructuras de datos. La base de todo.',
    color: '#00d4ff',
    emoji: '📚',
  },
  {
    title: 'Crea tus primeros scripts por tu cuenta',
    description: 'Automatiza algo real. Rompe cosas. Aprende resolviendo problemas.',
    color: '#a855f7',
    emoji: '⚡',
  },
  {
    title: 'Implementa IA con Claude Code o Antigravity',
    description: 'Usa agentes de código para construir proyectos completos con inteligencia artificial.',
    color: '#ec4899',
    emoji: '🤖',
  },
];

export default function Slide21Actions(): ReactNode {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = actions.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 600 + i * 800)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '900px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 7vw, 5rem)',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          3 cosas para hacer <span style={{ color: 'var(--neon-cyan)' }}>HOY</span>
        </motion.h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
          width: '100%',
        }}>
          {actions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: -30 }}
              animate={i < visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                padding: 'clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 2.5vw, 1.5rem)',
                background: `${action.color}06`,
                border: `1px solid ${action.color}20`,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.75rem, 2vw, 1.25rem)',
              }}
            >
              <div style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
                width: 'clamp(40px, 8vw, 56px)',
                height: 'clamp(40px, 8vw, 56px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `${action.color}10`,
                borderRadius: '12px',
                flexShrink: 0,
              }}>
                {action.emoji}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.95rem, 2.5vw, 2rem)',
                  color: 'var(--color-ignite-text-primary)',
                  fontWeight: 600,
                  marginBottom: '0.25rem',
                }}>
                  <span style={{ color: action.color, marginRight: '0.5rem' }}>{i + 1}.</span>
                  {action.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.7rem, 1.5vw, 1.25rem)',
                  color: '#ffffff',
                }}>
                  {action.description}
                </div>
              </div>


            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visible >= 3 ? 1 : 0 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.7rem, 1.5vw, 1.25rem)',
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          No esperen a que les enseñen todo. Empiecen hoy.
        </motion.p>
      </div>
    </div>
  );
}
