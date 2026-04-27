import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const promptLines = [
  '$ claude',
  '',
  '> Construye un dashboard de producción',
  '  con gráficas en tiempo real,',
  '  alertas de anomalías y un panel',
  '  de métricas KPI.',
];

const appElements = [
  { label: 'Header + Nav', color: '#00d4ff', width: '100%', height: 'clamp(15px, 5vw, 50px)' },
  { label: 'KPI Cards', color: '#a855f7', width: '100%', height: 'clamp(25px, 9vw, 80px)' },
  { label: 'Chart Area', color: '#06d6a0', width: '100%', height: 'clamp(45px, 15vw, 150px)' },
  { label: 'Alert Panel', color: '#ec4899', width: '100%', height: 'clamp(20px, 7vw, 60px)' },
];

interface Slide11VibeCodingProps {
  subStep?: number;
}

export default function Slide11VibeCoding({ subStep = 0 }: Slide11VibeCodingProps): ReactNode {
  /* ── subStep 0: type out prompt lines one by one ── */
  const [typedLine, setTypedLine] = useState(0);

  useEffect(() => {
    if (subStep !== 0) return;
    setTypedLine(0);
    const timers = promptLines.map((_, i) =>
      setTimeout(() => setTypedLine(i + 1), 300 + i * 350)
    );
    return () => timers.forEach(clearTimeout);
  }, [subStep]);

  /* ── subStep 2: reveal app elements one by one ── */
  const [appElement, setAppElement] = useState(0);

  useEffect(() => {
    if (subStep !== 2) { setAppElement(0); return; }
    const timers = appElements.map((_, i) =>
      setTimeout(() => setAppElement(i + 1), 400 + i * 500)
    );
    return () => timers.forEach(clearTimeout);
  }, [subStep]);

  /* ── Working dots animation ── */
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (subStep !== 1) { setDots(''); return; }
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, [subStep]);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '1400px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label">
          La revolución silenciosa
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 10vw, 8rem)',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          <span style={{ color: 'var(--neon-cyan)' }}>Vibe Coding</span>
        </motion.h2>

        {/* Split screen */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(0.8rem, 4vw, 3rem)',
          width: '100%',
        }}>
          {/* ═══════════ Terminal ═══════════ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: '#0d1117',
              borderRadius: '12px',
              border: '1px solid #21262d',
              overflow: 'hidden',
            }}
          >
            {/* Terminal header */}
            <div style={{
              padding: 'clamp(0.25rem, 1vw, 1rem) clamp(0.4rem, 1.5vw, 1.5rem)',
              background: '#161b22',
              display: 'flex',
              gap: 'clamp(3px, 1vw, 12px)',
              alignItems: 'center',
            }}>
              <div style={{ width: 'clamp(5px, 1.2vw, 16px)', height: 'clamp(5px, 1.2vw, 16px)', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 'clamp(5px, 1.2vw, 16px)', height: 'clamp(5px, 1.2vw, 16px)', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 'clamp(5px, 1.2vw, 16px)', height: 'clamp(5px, 1.2vw, 16px)', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.7rem, 2vw, 2rem)', color: '#8b949e', marginLeft: '0.5rem' }}>terminal</span>
            </div>

            {/* Terminal content */}
            <div style={{ padding: 'clamp(0.5rem, 2vw, 2rem)', height: 'clamp(140px, 45vw, 480px)', overflow: 'hidden' }}>
              {/* subStep 0: show prompt typing out */}
              {subStep >= 0 && promptLines.slice(0, typedLine).map((line, i) => (
                <div key={i} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.7rem, 1.5vw, 1.6rem)',
                  lineHeight: 1.8,
                  color: line.startsWith('$') ? '#06d6a0' :
                         line.startsWith('>') ? '#c9d1d9' :
                         line.startsWith('  ') ? '#c9d1d9' : '#8b949e',
                  whiteSpace: 'pre',
                }}>
                  {line}
                </div>
              ))}

              {/* subStep 0: blinking cursor while typing */}
              {subStep === 0 && (
                <span style={{
                  display: 'inline-block',
                  width: 'clamp(3px, 1vw, 14px)',
                  height: 'clamp(7px, 2vw, 28px)',
                  background: 'var(--neon-cyan)',
                  animation: 'blink-cursor 1s step-end infinite',
                }} />
              )}

              {/* subStep 1: show all prompt lines + "working" */}
              {subStep >= 1 && typedLine < promptLines.length && promptLines.slice(typedLine).map((line, i) => (
                <div key={`rest-${i}`} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.7rem, 1.5vw, 1.6rem)',
                  lineHeight: 1.8,
                  color: line.startsWith('$') ? '#06d6a0' :
                         line.startsWith('>') ? '#c9d1d9' :
                         line.startsWith('  ') ? '#c9d1d9' : '#8b949e',
                  whiteSpace: 'pre',
                }}>
                  {line}
                </div>
              ))}

              {/* subStep 1 & 2: Status indicator wrapped in grid container for perfect overlay */}
              <div style={{ display: 'grid', marginTop: 'clamp(0.25rem, 1vw, 1rem)', minHeight: '1.8em', alignItems: 'center' }}>
                <AnimatePresence>
                  {subStep === 1 && (
                    <motion.div
                      key="working"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        gridArea: '1 / 1',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(0.7rem, 1.5vw, 1.6rem)',
                        lineHeight: 1.8,
                        color: '#f59e0b',
                        whiteSpace: 'pre',
                      }}
                    >
                      ⏳ Generando código{dots}
                    </motion.div>
                  )}
                  {subStep >= 2 && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        gridArea: '1 / 1',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(0.7rem, 1.5vw, 1.6rem)',
                        lineHeight: 1.8,
                        color: '#27c93f',
                        whiteSpace: 'pre',
                      }}
                    >
                      ✅ Dashboard generado — 4 componentes
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ═══════════ App rendering ═══════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: subStep >= 2 ? 1 : 0.3, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              background: 'var(--color-slide-surface)',
              borderRadius: '12px',
              border: '1px solid var(--color-slide-border)',
              overflow: 'hidden',
              filter: subStep < 2 ? 'grayscale(0.5)' : 'none',
              transition: 'filter 0.5s ease',
            }}
          >
            {/* Browser chrome */}
            <div style={{
              padding: 'clamp(0.25rem, 1vw, 1rem) clamp(0.4rem, 1.5vw, 1.5rem)',
              background: 'var(--color-slide-surface-raised)',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.25rem, 1vw, 1rem)',
            }}>
              <div style={{
                flex: 1,
                height: 'clamp(10px, 3vw, 40px)',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.05)',
                padding: '0 clamp(0.25rem, 1vw, 1rem)',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.7rem, 2vw, 1.7rem)', color: '#ffffff' }}>
                  localhost:3000/dashboard
                </span>
              </div>
            </div>

            {/* Rendered app elements — only reveal at subStep 2 */}
            <div style={{ padding: 'clamp(0.5rem, 2vw, 2rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(0.3rem, 1.6vw, 1rem)', height: 'clamp(140px, 45vw, 480px)' }}>
              {subStep >= 2 ? appElements.map((el, i) => (
                <motion.div
                  key={el.label}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={i < appElement ? { opacity: 1, scaleY: 1 } : {}}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: el.width,
                    height: el.height,
                    borderRadius: '6px',
                    background: `${el.color}15`,
                    border: `1px solid ${el.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transformOrigin: 'top',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.7rem, 2.4vw, 2rem)', color: el.color }}>
                    {el.label}
                  </span>
                </motion.div>
              )) : (
                /* Placeholder "waiting" state */
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#8b949e',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.8rem, 2.6vw, 2rem)',
                }}>
                  {subStep === 1 ? (
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    >
                      Esperando resultado...
                    </motion.span>
                  ) : (
                    <span style={{ opacity: 0.4 }}>— Sin contenido —</span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Stat — always present in DOM to prevent layout shifts */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'clamp(0.5rem, 3vw, 2rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: subStep >= 2 ? 1 : 0, y: subStep >= 2 ? 0 : 12 }}
            transition={{ delay: subStep >= 2 ? 2.5 : 0 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 5vw, 3.5rem)',
              fontWeight: 600,
              textAlign: 'center',
              pointerEvents: subStep >= 2 ? 'auto' : 'none',
            }}
          >
            <span style={{ color: 'var(--neon-cyan)' }}>41%</span>
            <span style={{ color: '#ffffff' }}> del código global es generado por IA</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
