import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

const modules = [
  {
    id: 1, name: 'Módulo I', topic: 'Programación', role: 'Dev Jr', salary: '$15-25K MXN', color: '#00d4ff',
  },
  {
    id: 2, name: 'Módulo II', topic: 'ML & Visión', role: 'ML Engineer', salary: '$30-50K MXN', color: '#a855f7',
  },
  {
    id: 3, name: 'Módulo III', topic: 'Datos & NLP', role: 'AI Trainer', salary: '$25-40K MXN', color: '#ec4899',
  },
  {
    id: 4, name: 'Módulo IV', topic: 'Automatización', role: 'Automation Specialist', salary: '$35-55K MXN', color: '#f59e0b',
  },
  {
    id: 5, name: 'Módulo V', topic: 'Integración', role: 'AI Systems Integrator', salary: '$40-70K MXN', color: '#06d6a0',
  },
];

const connections = [
  [0, 1], [0, 2], [1, 3], [2, 4], [1, 4], [2, 3],
];

export default function Slide15SkillTree(): ReactNode {
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const timers = modules.map((_, i) =>
      setTimeout(() => setLit(i + 1), 600 + i * 600)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const getX = (index: number) => index === 0 ? '50%' : (index === 1 || index === 3) ? '25%' : '75%';
  const getY = (index: number) => index === 0 ? '16.66%' : (index === 1 || index === 2) ? '50%' : '83.33%';

  const renderNode = (mod: typeof modules[0], i: number) => (
    <motion.div
      key={mod.id}
      initial={{ opacity: 0, scale: 0 }}
      animate={i < lit ? { opacity: 1, scale: 1 } : { opacity: 0.15, scale: 0.85 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      style={{
        padding: 'clamp(0.4rem, 1.65vw, 0.825rem) clamp(0.5rem, 1.98vw, 1.32rem)',
        background: i < lit ? `${mod.color}12` : 'var(--color-slide-surface)',
        border: `1.5px solid ${i < lit ? `${mod.color}50` : 'var(--color-slide-border)'}`,
        borderRadius: 'clamp(10px, 1.98vw, 23.1px)',
        textAlign: 'center',
        width: 'clamp(135px, 24vw, 231px)',
        zIndex: 2,
        boxShadow: i < lit ? `0 0 20px ${mod.color}15` : 'none',
        transition: 'background 0.5s ease, border 0.5s ease',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.55rem, 1.48vw, 1.23rem)',
        color: mod.color,
        fontWeight: 600,
        marginBottom: 0,
        lineHeight: 1.1,
      }}>{mod.name}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(0.8rem, 2.14vw, 1.81rem)',
        color: 'var(--color-ignite-text-primary)',
        fontWeight: 600,
        lineHeight: 1.1,
      }}>{mod.topic}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.55rem, 1.48vw, 1.23rem)',
        color: '#ffffff',
        marginTop: '2px',
        lineHeight: 1.1,
      }}>→ {mod.role}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.5rem, 1.4vw, 1.15rem)',
        color: mod.color,
        marginTop: 0,
        lineHeight: 1.1,
      }}>{mod.salary}</div>
    </motion.div>
  );

  return (
    <div className="slide">
      <div className="slide-inner" style={{
        maxWidth: '960px',
        padding: '0 clamp(1.65rem, 6.6vw, 3.3rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 'clamp(1.5rem, 3.5vw, 3rem)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label">
            Tu carrera en contexto
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 5vw, 3.2rem)',
              fontWeight: 700,
              textAlign: 'center',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            <span style={{ color: 'var(--neon-green)' }}>Skill Tree</span> — Mapa de Competencias
          </motion.h2>
        </div>

        {/* Skill tree Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '850px',
          margin: '0 auto',
          flex: '0 1 auto',
          display: 'grid',
          gridTemplateRows: '1fr 1fr 1fr',
          minHeight: 'clamp(480px, 55vh, 600px)',
        }}>
          {/* Connection lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} preserveAspectRatio="none">
            {connections.map(([from, to], i) => (
              <line
                key={i}
                x1={getX(from)}
                y1={getY(from)}
                x2={getX(to)}
                y2={getY(to)}
                stroke={lit > Math.max(from, to) ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.05)'}
                strokeWidth="1.5"
                strokeDasharray={lit > Math.max(from, to) ? 'none' : '4 4'}
                style={{ transition: 'all 0.5s ease' }}
              />
            ))}
          </svg>

          {/* Row 1 */}
          <div style={{ gridRow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1, width: '100%' }}>
            {renderNode(modules[0], 0)}
          </div>

          {/* Row 2 */}
          <div style={{ gridRow: 2, display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1, width: '100%' }}>
            {renderNode(modules[1], 1)}
            {renderNode(modules[2], 2)}
          </div>

          {/* Row 3 */}
          <div style={{ gridRow: 3, display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1, width: '100%' }}>
            {renderNode(modules[3], 3)}
            {renderNode(modules[4], 4)}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.07rem, 2.14vw, 1.98rem)',
            color: '#ffffff',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Lo que aprenden se mapea directamente a roles reales
        </motion.p>
      </div>
    </div>
  );
}
