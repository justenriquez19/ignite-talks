import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

const buildSteps = [
  { text: '$ claude --model opus', color: '#06d6a0', delay: 0 },
  { text: '', color: '', delay: 300 },
  { text: '> Construye una presentación interactiva', color: '#c9d1d9', delay: 600 },
  { text: '  de 21 slides sobre IA en producción', color: '#c9d1d9', delay: 900 },
  { text: '  con partículas, gráficas y animaciones.', color: '#c9d1d9', delay: 1200 },
  { text: '', color: '', delay: 1500 },
  { text: '⚡ Creando 21 componentes React...', color: '#f59e0b', delay: 1800 },
  { text: '✓ Slide01Title.tsx', color: '#06d6a0', delay: 2200 },
  { text: '✓ Slide02WhoAmI.tsx', color: '#06d6a0', delay: 2400 },
  { text: '✓ ...19 slides más', color: '#06d6a0', delay: 2600 },
  { text: '', color: '', delay: 2800 },
  { text: '🚀 Deploy: vercel --prod', color: '#a855f7', delay: 3000 },
  { text: '✓ https://ignite-talks.vercel.app', color: '#00d4ff', delay: 3400 },
];

export default function Slide19Demo(): ReactNode {
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const timers = buildSteps.map((step, i) =>
      setTimeout(() => setLineCount(i + 1), 500 + step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '850px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label">
          Meta-demostración
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
          Esta presentación fue <span className="text-neon">construida con IA</span>
        </motion.h2>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            width: '100%',
            background: '#0d1117',
            borderRadius: '14px',
            border: '1px solid #21262d',
            overflow: 'hidden',
          }}
        >
          {/* Chrome */}
          <div style={{
            padding: '0.625rem 0.875rem',
            background: '#161b22',
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.5rem, 1.2vw, 1rem)', color: '#8b949e', marginLeft: '0.5rem' }}>
              claude-code — ignite-talks
            </span>
          </div>

          {/* Content */}
          <div style={{ padding: 'clamp(0.75rem, 2vw, 1rem)', minHeight: '280px' }}>
            {buildSteps.slice(0, lineCount).map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.6rem, 1.3vw, 1.1rem)',
                  lineHeight: 1.8,
                  color: step.color || 'transparent',
                  whiteSpace: 'pre',
                  minHeight: step.text ? undefined : '1.4em',
                }}
              >
                {step.text}
              </motion.div>
            ))}
            <span style={{
              display: 'inline-block',
              width: '7px',
              height: '14px',
              background: 'var(--neon-cyan)',
              animation: 'blink-cursor 1s step-end infinite',
              marginTop: '0.25rem',
            }} />
          </div>
        </motion.div>

        {/* Stack badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          style={{ display: 'flex', gap: 'clamp(0.3rem, 1vw, 0.5rem)', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {['Astro 6', 'React 19', 'Motion 12', 'Tailwind 4', 'Claude Code', 'Vercel'].map(tech => (
            <span key={tech} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.55rem, 1.2vw, 1rem)',
              padding: 'clamp(0.15rem, 0.5vw, 0.25rem) clamp(0.4rem, 1.2vw, 0.625rem)',
              background: 'var(--color-slide-surface)',
              border: '1px solid var(--color-slide-border)',
              borderRadius: '20px',
              color: '#ffffff',
            }}>
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
