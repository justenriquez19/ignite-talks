import { type ReactNode } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';

interface Slide03QuestionProps {
  /** Current sub-step within this slide (0 = just entered, 1 = first tick, 2 = second tick) */
  subStep?: number;
}

export default function Slide03Question({ subStep = 0 }: Slide03QuestionProps): ReactNode {
  return (
    <div className="slide" style={{ background: '#050508' }}>
      <LayoutGroup>
        <div className="slide-inner" style={{ gap: 'clamp(1.5rem, 4vw, 3rem)', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
          <AnimatePresence>
            {subStep >= 0 && (
              <motion.h2
                key="q1"
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  layout: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
                }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 5vw, 5rem)',
                  fontWeight: 600,
                  color: 'var(--color-ignite-text-primary)',
                  lineHeight: 1.2,
                  textAlign: 'center',
                }}
              >
                ¿Cuántos de ustedes han usado{' '}
                <span style={{ color: 'var(--neon-cyan)' }}>ChatGPT</span>?
              </motion.h2>
            )}
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            {subStep >= 1 && (
              <motion.div
                key="q2"
                layout
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 12, filter: 'blur(6px)', transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.1, 0.25, 1],
                  layout: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
                }}
                style={{ textAlign: 'center' }}
              >
                <motion.div
                  className="neon-line"
                  style={{ marginBottom: '2rem', opacity: 0.3 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 5.5vw, 5.5rem)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  <span style={{ color: 'var(--color-slide-text-dim)' }}>¿Cuántos han </span>
                  <span className="text-neon">CONSTRUIDO</span>
                  <span style={{ color: 'var(--color-slide-text-dim)' }}> algo con IA?</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.85rem, 2vw, 1.5rem)',
                    color: 'var(--color-slide-text-dim)',
                    marginTop: 'clamp(0.75rem, 2vw, 2rem)',
                    letterSpacing: '0.05em',
                  }}
                >
                  Usar ≠ Construir — esa es la diferencia
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
}

