import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

const modules = [
  {
    id: 1,
    name: 'Módulo I',
    topic: 'Programación',
    role: 'Dev Jr',
    salary: '$15-25K MXN',
    color: '#00d4ff',
    x: 50, y: 10,
  },
  {
    id: 2,
    name: 'Módulo II',
    topic: 'ML & Visión',
    role: 'ML Engineer',
    salary: '$30-50K MXN',
    color: '#a855f7',
    x: 20, y: 35,
  },
  {
    id: 3,
    name: 'Módulo III',
    topic: 'Datos & NLP',
    role: 'AI Trainer',
    salary: '$25-40K MXN',
    color: '#ec4899',
    x: 80, y: 35,
  },
  {
    id: 4,
    name: 'Módulo IV',
    topic: 'Automatización',
    role: 'Automation Specialist',
    salary: '$35-55K MXN',
    color: '#f59e0b',
    x: 30, y: 65,
  },
  {
    id: 5,
    name: 'Módulo V',
    topic: 'Integración',
    role: 'AI Systems Integrator',
    salary: '$40-70K MXN',
    color: '#06d6a0',
    x: 70, y: 65,
  },
];

const connections = [
  [0, 1], [0, 2], [1, 3], [2, 4], [1, 4], [2, 3],
];

export default function Slide16SkillTree(): ReactNode {
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const timers = modules.map((_, i) =>
      setTimeout(() => setLit(i + 1), 600 + i * 600)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '900px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label">
          Tu carrera en contexto
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
          <span style={{ color: 'var(--neon-green)' }}>Skill Tree</span> — Mapa de Competencias
        </motion.h2>

        {/* Skill tree */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          aspectRatio: '16/10',
          margin: '0 auto',
        }}>
          {/* Connection lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {connections.map(([from, to], i) => (
              <line
                key={i}
                x1={`${modules[from].x}%`}
                y1={`${modules[from].y + 5}%`}
                x2={`${modules[to].x}%`}
                y2={`${modules[to].y}%`}
                stroke={lit > Math.max(from, to) ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.05)'}
                strokeWidth="1.5"
                strokeDasharray={lit > Math.max(from, to) ? 'none' : '4 4'}
                style={{ transition: 'all 0.5s ease' }}
              />
            ))}
          </svg>

          {/* Module nodes */}
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={i < lit ? { opacity: 1, scale: 1 } : { opacity: 0.15, scale: 0.85 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              style={{
                position: 'absolute',
                top: `${mod.y}%`,
                left: `${mod.x}%`,
                transform: 'translate(-50%, -50%)',
                padding: 'clamp(0.4rem, 1.2vw, 0.625rem) clamp(0.6rem, 1.5vw, 1rem)',
                background: i < lit ? `${mod.color}12` : 'var(--color-slide-surface)',
                border: `1.5px solid ${i < lit ? `${mod.color}50` : 'var(--color-slide-border)'}`,
                borderRadius: '14px',
                textAlign: 'center',
                minWidth: '120px',
                zIndex: 2,
                boxShadow: i < lit ? `0 0 20px ${mod.color}15` : 'none',
                transition: 'background 0.5s ease, border 0.5s ease',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.5rem, 1.1vw, 0.9rem)',
                color: mod.color,
                fontWeight: 600,
                marginBottom: '2px',
              }}>{mod.name}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.7rem, 1.5vw, 1.25rem)',
                color: 'var(--color-ignite-text-primary)',
                fontWeight: 600,
              }}>{mod.topic}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.5rem, 1.1vw, 0.9rem)',
                color: '#ffffff',
                marginTop: '2px',
              }}>→ {mod.role}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.45rem, 1vw, 0.85rem)',
                color: mod.color,
                marginTop: '2px',
              }}>{mod.salary}</div>
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
          Lo que aprenden se mapea directamente a roles reales
        </motion.p>
      </div>
    </div>
  );
}
