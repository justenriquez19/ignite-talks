import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

function AnimatedCounter({ target, duration = 2000, delay = 0, suffix = '%' }: { target: number; duration?: number; delay?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      function tick() {
        const elapsed = performance.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return <>{count}{suffix}</>;
}

export default function Slide10Stats(): ReactNode {
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSecond(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="slide" style={{ background: '#050508' }}>
      <div className="slide-inner" style={{ gap: 'clamp(1.5rem, 4vw, 3rem)', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        {/* First stat: 98% */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <div className="slide-big-number" style={{ color: 'var(--neon-cyan)' }}>
            <AnimatedCounter target={98} delay={500} />
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.1rem, 3vw, 2.5rem)',
            color: 'var(--color-ignite-text-primary)',
            marginTop: 'clamp(0.25rem, 1vw, 0.5rem)',
            textAlign: 'center',
          }}>
            de fabricantes exploran IA
          </div>
        </motion.div>

        {showSecond && (
          <>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5 }}
              className="neon-line"
              style={{ opacity: 0.3 }}
            />

            {/* Second stat: 20% */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center' }}
            >
              <div className="slide-big-number" style={{
                background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                <AnimatedCounter target={20} delay={200} />
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.1rem, 3vw, 2.5rem)',
                color: '#ffffff',
                marginTop: 'clamp(0.25rem, 1vw, 0.5rem)',
                textAlign: 'center',
              }}>
                están preparados para usarla
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
                background: 'rgba(168,85,247,0.08)',
                border: '1px solid rgba(168,85,247,0.2)',
                borderRadius: '12px',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                color: 'var(--neon-purple)',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Esa brecha = TU oportunidad
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
