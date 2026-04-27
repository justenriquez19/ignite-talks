import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

const steps = [
  { label: 'Detecta anomalía', icon: '🔍', color: '#00d4ff' },
  { label: 'Crea orden de trabajo', icon: '📋', color: '#a855f7' },
  { label: 'Reserva refacciones', icon: '📦', color: '#ec4899' },
  { label: 'Notifica técnico', icon: '📱', color: '#f59e0b' },
  { label: 'Registra resultado', icon: '✅', color: '#06d6a0' },
];

export default function Slide08Agents(): ReactNode {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(() => setActiveStep(i), 800 + i * 800)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '950px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label" style={{ color: 'var(--neon-pink)' }}>
          🤖 Pilar 3 — Actuar
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
          Agentes Autónomos
        </motion.h2>

        {/* Flowchart */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(0.15rem, 0.5vw, 0.25rem)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%',
        }}>
          {steps.map((step, i) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0.15, scale: 0.85 }}
                animate={i <= activeStep ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                style={{
                  padding: 'clamp(0.625rem, 1.5vw, 1rem) clamp(0.75rem, 1.5vw, 1.25rem)',
                  background: i <= activeStep ? `${step.color}15` : 'var(--color-slide-surface)',
                  border: `1px solid ${i <= activeStep ? `${step.color}40` : 'var(--color-slide-border)'}`,
                  borderRadius: '14px',
                  textAlign: 'center',
                  minWidth: '100px',
                  boxShadow: i <= activeStep ? `0 0 20px ${step.color}15` : 'none',
                  transition: 'all 0.5s ease',
                }}
              >
                <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '0.25rem' }}>{step.icon}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.7rem, 1.6vw, 1.4rem)',
                  color: i <= activeStep ? step.color : '#ffffff',
                  fontWeight: 500,
                  textAlign: 'center',
                }}>
                  {step.label}
                </div>
              </motion.div>

              {/* Arrow */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0.1 }}
                  animate={i < activeStep ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3 }}
                  style={{
                    color: i < activeStep ? steps[i + 1].color : 'var(--color-slide-border)',
                    fontSize: 'clamp(1rem, 2vw, 1.75rem)',
                    margin: '0 clamp(0.15rem, 0.5vw, 0.25rem)',
                    transition: 'color 0.5s ease',
                  }}
                >
                  →
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5 }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 'clamp(0.75rem, 2vw, 1.5rem)',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'clamp(0.75rem, 2vw, 1rem)',
            width: '100%',
          }}
        >
          <div style={{
            padding: 'clamp(0.75rem, 2vw, 1rem)',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2.5vw, 2rem)', color: '#ffffff', fontWeight: 600 }}>Antes</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.85rem, 1.8vw, 1.5rem)', color: 'var(--color-ignite-text-primary)', marginTop: '0.25rem' }}>5 personas · 3 días</div>
          </div>

          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--neon-cyan)', textAlign: 'center' }}>→</div>

          <div style={{
            padding: 'clamp(0.75rem, 2vw, 1rem)',
            background: 'rgba(0,212,255,0.06)',
            borderRadius: '12px',
            border: '1px solid rgba(0,212,255,0.15)',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2.5vw, 2rem)', color: 'var(--neon-cyan)', fontWeight: 600 }}>Ahora</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.85rem, 1.8vw, 1.5rem)', color: 'var(--color-ignite-text-primary)', marginTop: '0.25rem' }}>1 agente · 4 horas</div>
          </div>
        </motion.div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.7rem, 1.4vw, 1.4rem)', color: '#ffffff', textAlign: 'center' }}>
          40% de las apps empresariales tendrán agentes integrados en 2026
        </p>
      </div>
    </div>
  );
}
