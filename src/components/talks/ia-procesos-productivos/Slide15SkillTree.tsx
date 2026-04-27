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
    x: 40, y: 5,
  },
  {
    id: 2,
    name: 'Módulo II',
    topic: 'ML & Visión',
    role: 'ML Engineer',
    salary: '$30-50K MXN',
    color: '#a855f7',
    x: 8, y: 40,
  },
  {
    id: 3,
    name: 'Módulo III',
    topic: 'Datos & NLP',
    role: 'AI Trainer',
    salary: '$25-40K MXN',
    color: '#ec4899',
    x: 72, y: 40,
  },
  {
    id: 4,
    name: 'Módulo IV',
    topic: 'Automatización',
    role: 'Automation Specialist',
    salary: '$35-55K MXN',
    color: '#f59e0b',
    x: 16, y: 78,
  },
  {
    id: 5,
    name: 'Módulo V',
    topic: 'Integración',
    role: 'AI Systems Integrator',
    salary: '$40-70K MXN',
    color: '#06d6a0',
    x: 56, y: 78,
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
      <div className="slide-inner" style={{
        maxWidth: '960px',
        padding: '0 clamp(1rem, 4vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 'clamp(0.5rem, 1.5vw, 1rem)',
      }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label">
          Tu carrera en contexto
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 5vw, 3.2rem)',
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          <span style={{ color: 'var(--neon-green)' }}>Skill Tree</span> — Mapa de Competencias
        </motion.h2>

        {/* Skill tree */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '750px',
          aspectRatio: '16/11',
          margin: '0 auto',
          flex: '1 1 auto',
          minHeight: 0,
          maxHeight: 'clamp(250px, 45vh, 450px)',
        }}>
          {/* Connection lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
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
                padding: 'clamp(0.3rem, 1vw, 0.5rem) clamp(0.5rem, 1.2vw, 0.8rem)',
                background: i < lit ? `${mod.color}12` : 'var(--color-slide-surface)',
                border: `1.5px solid ${i < lit ? `${mod.color}50` : 'var(--color-slide-border)'}`,
                borderRadius: 'clamp(8px, 1.2vw, 14px)',
                textAlign: 'center',
                minWidth: 'clamp(90px, 14vw, 140px)',
                zIndex: 2,
                boxShadow: i < lit ? `0 0 20px ${mod.color}15` : 'none',
                transition: 'background 0.5s ease, border 0.5s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.45rem, 0.9vw, 0.75rem)',
                color: mod.color,
                fontWeight: 600,
                marginBottom: '1px',
              }}>{mod.name}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.65rem, 1.3vw, 1.1rem)',
                color: 'var(--color-ignite-text-primary)',
                fontWeight: 600,
              }}>{mod.topic}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.45rem, 0.9vw, 0.75rem)',
                color: '#ffffff',
                marginTop: '1px',
              }}>→ {mod.role}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.4rem, 0.85vw, 0.7rem)',
                color: mod.color,
                marginTop: '1px',
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
            fontSize: 'clamp(0.65rem, 1.3vw, 1.2rem)',
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
