import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

function AnimatedCounter({ target, delay = 0, suffix = '%' }: { target: number; delay?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      function tick() {
        const elapsed = performance.now() - start;
        const progress = Math.min(elapsed / 1500, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return <>{count}{suffix}</>;
}

export default function Slide20Opportunity(): ReactNode {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowMessage(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="slide" style={{ background: '#050508' }}>
      <div className="slide-inner" style={{ gap: 'clamp(1.5rem, 4vw, 3rem)', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label">
          El mensaje central
        </motion.div>

        {/* Three numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex',
            gap: 'clamp(1rem, 3vw, 3rem)',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 700,
              color: 'var(--neon-cyan)',
              lineHeight: 1,
            }}>
              <AnimatedCounter target={98} delay={500} />
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.85rem, 2vw, 1.5rem)', color: '#ffffff', marginTop: 'clamp(0.15rem, 0.5vw, 0.25rem)' }}>
              quieren IA
            </div>
          </div>

          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--color-slide-border)',
          }}>·</div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 700,
              lineHeight: 1,
              background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              <AnimatedCounter target={20} delay={1500} />
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.85rem, 2vw, 1.5rem)', color: '#ffffff', marginTop: 'clamp(0.15rem, 0.5vw, 0.25rem)' }}>
              pueden implementarla
            </div>
          </div>
        </motion.div>

        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1.5rem, 4vw, 2.5rem)',
              background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(168,85,247,0.08), rgba(236,72,153,0.08))',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 0 60px rgba(0,212,255,0.08)',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 7vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.2,
            }}>
              <span style={{ color: 'var(--color-ignite-text-primary)' }}>Ustedes son el </span>
              <span className="text-neon">20%</span>
            </div>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showMessage ? 1 : 0 }}
          transition={{ delay: 1 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2.5vw, 2rem)',
            color: '#ffffff',
            textAlign: 'center',
            maxWidth: '600px',
          }}
        >
          La carrera correcta. El momento correcto.
        </motion.p>
      </div>
    </div>
  );
}
