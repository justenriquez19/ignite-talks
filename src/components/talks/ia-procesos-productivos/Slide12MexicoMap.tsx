import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ── Industrial hotspots (northern / bajío clusters) ── */
const hotspots = [
  { city: 'Baja California', x: 3.6, y: 7.5, industry: 'Electrónica', ai: 'Control de calidad', color: '#ec4899', labelDir: 'right' as const },
  { city: 'Chihuahua', x: 37.0, y: 24.2, industry: 'Electrónica', ai: 'Inspección PCBs', color: '#a855f7', labelDir: 'right' as const },
  { city: 'Monterrey', x: 55.2, y: 39.4, industry: 'Automotriz', ai: 'Visión artificial', color: '#00d4ff', labelDir: 'right' as const },
  { city: 'Guanajuato', x: 52.3, y: 63.4, industry: 'Automotriz', ai: 'Robótica + IA', color: '#00d4ff', labelDir: 'left' as const },
  { city: 'Querétaro', x: 55.0, y: 65.7, industry: 'Aeroespacial', ai: 'Visión artificial', color: '#06d6a0', labelDir: 'right' as const },
  { city: 'Puebla', x: 61.9, y: 73.6, industry: 'Automotriz', ai: 'Ensamble automatizado', color: '#f59e0b', labelDir: 'right' as const },
];

/* ── Chetumal — the star of the show ── */
const chetumal = {
  city: 'Chetumal',
  x: 89.4,
  y: 76.4,
  industry: 'Gobierno',
  ai: '¿Y si empezamos aquí?',
  color: '#e63620', // ignite-fire
  colorBright: '#ff4a33',
};

/* ── Stat cards with paradox storytelling ── */
const stats = [
  { value: '9ª', label: 'potencia manufacturera', color: '#00d4ff', sentiment: 'positive' },
  { value: '22%', label: 'del PIB es manufactura', color: '#06d6a0', sentiment: 'positive' },
  { value: '18%', label: 'usa IA en producción', color: '#ef4444', sentiment: 'alert' },
];

/* ── CSS keyframes injected once ── */
const chetumalPulseKeyframes = `
@keyframes chetumal-ping {
  0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
  70%  { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
  100% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
}
@keyframes chetumal-breathe {
  0%, 100% { box-shadow: 0 0 12px #e6362080, 0 0 30px #e6362050, 0 0 60px #e6362030; }
  50%      { box-shadow: 0 0 20px #ff4a33a0, 0 0 50px #ff4a3370, 0 0 90px #e6362050; }
}
`;

export default function Slide12MexicoMap(): ReactNode {
  const [activeSpot, setActiveSpot] = useState<number | null>(null);
  const [hoveredChetumal, setHoveredChetumal] = useState(false);

  /* Inject keyframes once */
  useEffect(() => {
    const id = 'chetumal-pulse-style';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = chetumalPulseKeyframes;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '950px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label">
          La manufactura mexicana
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
          México en el Mapa
        </motion.h2>

        {/* ═══ Map container ═══ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '700px',
            aspectRatio: '104/64',
            background: 'var(--color-slide-surface)',
            borderRadius: '20px',
            border: '1px solid var(--color-slide-border)',
            overflow: 'visible',
          }}
        >
          {/* Mexico outline SVG */}
          <svg viewBox="0 0 104 64" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            <path
              d="M67.93,24.60 L66.65,27.49 L66.07,29.87 L65.83,34.29 L65.52,35.90 L66.09,37.70 L67.11,39.31 L67.77,41.87 L69.96,44.32 L70.73,46.20 L72.02,47.83 L75.52,48.70 L76.89,50.08 L79.78,49.16 L82.29,48.83 L84.76,48.23 L86.84,47.67 L88.94,46.32 L89.72,44.40 L89.99,41.63 L90.56,40.66 L92.80,39.80 L96.29,39.03 L99.21,39.15 L101.21,38.87 L102.00,39.57 L101.89,41.16 L100.12,43.12 L99.33,45.13 L99.94,45.70 L99.44,47.13 L98.62,49.70 L97.78,48.85 L97.09,48.91 L96.46,48.95 L95.28,50.94 L94.68,50.55 L94.28,50.71 L94.31,51.19 L91.26,51.15 L88.18,51.16 L88.18,53.02 L86.69,53.03 L87.92,54.13 L89.14,54.89 L89.50,55.60 L90.04,55.80 L89.95,56.93 L85.72,56.94 L84.13,59.62 L84.60,60.24 L84.22,61.01 L84.14,61.98 L80.40,58.42 L78.70,57.35 L76.01,56.49 L74.17,56.73 L71.52,57.97 L69.85,58.30 L67.52,57.43 L65.05,56.80 L61.97,55.29 L59.50,54.83 L55.76,53.29 L53.00,51.72 L52.17,50.84 L50.32,50.64 L46.95,49.59 L45.58,48.09 L42.03,46.22 L40.38,44.14 L39.59,42.53 L40.69,42.21 L40.35,41.27 L41.11,40.41 L41.13,39.27 L40.02,37.79 L39.72,36.48 L38.61,34.81 L35.70,31.53 L32.39,28.96 L30.78,26.90 L27.95,25.55 L27.35,24.75 L27.85,22.71 L26.17,21.94 L24.22,20.34 L23.40,18.03 L21.62,17.77 L19.71,16.03 L18.16,14.42 L18.02,13.39 L16.24,10.91 L15.08,8.38 L15.13,7.11 L12.74,5.80 L11.64,5.95 L9.76,5.04 L9.23,6.38 L9.77,7.96 L10.09,10.44 L11.23,11.80 L13.67,14.07 L14.22,14.85 L14.72,15.08 L15.15,16.22 L15.74,16.17 L16.40,18.30 L17.40,19.14 L18.11,20.30 L20.18,21.98 L21.27,25.05 L22.25,26.50 L23.17,28.04 L23.35,29.78 L24.94,29.89 L26.26,31.39 L27.46,32.86 L27.38,33.45 L25.99,34.66 L25.41,34.65 L24.54,32.64 L22.38,30.76 L20.00,29.17 L18.31,28.33 L18.42,25.92 L17.92,24.13 L16.35,23.11 L14.08,21.64 L13.65,22.06 L12.82,21.20 L10.78,20.40 L8.84,18.49 L9.08,18.24 L10.44,18.42 L11.66,17.19 L11.78,15.70 L9.24,13.35 L7.31,12.44 L6.09,10.38 L4.87,8.22 L3.34,5.58 L2.00,2.61 L5.75,2.36 L9.94,2.00 L9.63,2.65 L14.61,4.25 L22.14,6.57 L28.69,6.55 L31.31,6.55 L31.32,5.19 L37.03,5.19 L38.23,6.36 L39.92,7.40 L41.88,8.85 L42.98,10.57 L43.80,12.39 L45.50,13.38 L48.24,14.37 L50.32,11.77 L53.01,11.70 L55.34,13.02 L56.99,15.28 L58.13,17.21 L60.08,19.09 L60.81,21.40 L61.73,22.95 L64.30,23.97 L66.65,24.70 L67.93,24.60 Z"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.6"
            />
          </svg>

          {/* ── Industrial hotspots with persistent labels ── */}
          {hotspots.map((spot, i) => (
            <motion.div
              key={spot.city}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.12 }}
              onMouseEnter={() => setActiveSpot(i)}
              onMouseLeave={() => setActiveSpot(null)}
              style={{
                position: 'absolute',
                top: `${spot.y}%`,
                left: `${spot.x}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: activeSpot === i ? 10 : 2,
                cursor: 'pointer',
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: spot.color,
                  boxShadow: `0 0 10px ${spot.color}60, 0 0 20px ${spot.color}30`,
                  animation: 'neon-pulse 3s ease-in-out infinite',
                  animationDelay: `${i * 0.4}s`,
                }}
              />

              {/* Persistent mini-label */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  ...(spot.labelDir === 'right'
                    ? { left: '18px' }
                    : { right: '18px' }),
                  transform: 'translateY(-50%)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.45rem, 1.1vw, 0.75rem)',
                  color: spot.color,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                }}>
                  {spot.city}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.35rem, 0.8vw, 0.55rem)',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.2,
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                }}>
                  {spot.industry}
                </div>
              </div>

              {/* Expanded tooltip on hover */}
              <AnimatePresence>
                {activeSpot === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    style={{
                      position: 'absolute',
                      top: '22px',
                      left: spot.labelDir === 'right' ? '0' : 'auto',
                      right: spot.labelDir === 'left' ? '0' : 'auto',
                      padding: 'clamp(0.3rem, 0.8vw, 0.4rem) clamp(0.4rem, 1vw, 0.6rem)',
                      background: 'rgba(10,10,15,0.95)',
                      borderRadius: '8px',
                      border: `1px solid ${spot.color}40`,
                      backdropFilter: 'blur(8px)',
                      whiteSpace: 'nowrap',
                      zIndex: 20,
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(0.6rem, 1.3vw, 0.9rem)',
                      color: spot.color,
                      fontWeight: 600,
                    }}>
                      {spot.city} — {spot.industry}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.45rem, 1vw, 0.7rem)',
                      color: '#ffffff',
                      marginTop: '2px',
                    }}>
                      {spot.ai}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* ══════════════════════════════════════════
              ★ CHETUMAL — Protagonist dot
              ══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
            onMouseEnter={() => setHoveredChetumal(true)}
            onMouseLeave={() => setHoveredChetumal(false)}
            style={{
              position: 'absolute',
              top: `${chetumal.y}%`,
              left: `${chetumal.x}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 15,
              cursor: 'pointer',
            }}
          >
            {/* Ping ring */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: `2px solid ${chetumal.color}`,
                animation: 'chetumal-ping 2s ease-out infinite',
              }}
            />
            {/* Second ping ring (offset) */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: `2px solid ${chetumal.colorBright}`,
                animation: 'chetumal-ping 2s ease-out infinite',
                animationDelay: '0.8s',
              }}
            />
            {/* Main dot — larger, breathing glow */}
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, ${chetumal.colorBright}, ${chetumal.color})`,
                border: '2px solid rgba(255,255,255,0.3)',
                animation: 'chetumal-breathe 2s ease-in-out infinite',
                position: 'relative',
                zIndex: 2,
              }}
            />

            {/* Persistent Chetumal label */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '28px',
                transform: 'translateY(-50%)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                textAlign: 'right',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.55rem, 1.3vw, 0.9rem)',
                color: chetumal.colorBright,
                fontWeight: 700,
                lineHeight: 1.2,
                textShadow: '0 0 8px rgba(230,54,32,0.5), 0 1px 4px rgba(0,0,0,0.9)',
              }}>
                Chetumal ★
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.38rem, 0.9vw, 0.6rem)',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.2,
                textShadow: '0 1px 4px rgba(0,0,0,0.8)',
              }}>
                Capital de Q. Roo
              </div>
            </div>

            {/* Expanded tooltip on hover */}
            <AnimatePresence>
              {hoveredChetumal && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  style={{
                    position: 'absolute',
                    bottom: '30px',
                    right: '0',
                    padding: 'clamp(0.35rem, 0.9vw, 0.5rem) clamp(0.5rem, 1.2vw, 0.75rem)',
                    background: 'rgba(10,10,15,0.95)',
                    borderRadius: '10px',
                    border: `1px solid ${chetumal.color}60`,
                    backdropFilter: 'blur(8px)',
                    whiteSpace: 'nowrap',
                    zIndex: 20,
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(0.7rem, 1.4vw, 1rem)',
                    color: chetumal.colorBright,
                    fontWeight: 700,
                  }}>
                    Chetumal — Capital de Quintana Roo
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.5rem, 1vw, 0.75rem)',
                    color: '#ffffff',
                    marginTop: '2px',
                  }}>
                    Gobierno · Servicios · Turismo
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.4rem, 0.8vw, 0.6rem)',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '4px',
                  }}>
                    La oportunidad está aquí, donde vivimos
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ═══ Stats — Paradox storytelling ═══ */}
        <div style={{
          display: 'flex',
          gap: 'clamp(0.5rem, 2vw, 1rem)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'stretch',
          marginTop: 'clamp(0.5rem, 1.5vw, 0.75rem)',
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.15 }}
              style={{
                textAlign: 'center',
                padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(0.6rem, 1.5vw, 0.9rem)',
                background: s.sentiment === 'alert'
                  ? `${s.color}12`
                  : `${s.color}08`,
                borderRadius: '10px',
                border: `1px solid ${s.sentiment === 'alert' ? s.color + '40' : s.color + '20'}`,
                flex: '1 1 120px',
                maxWidth: '200px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Alert badge for the paradox stat */}
              {s.sentiment === 'alert' && (
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  right: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.35rem, 0.7vw, 0.5rem)',
                  color: s.color,
                  fontWeight: 700,
                  opacity: 0.8,
                  letterSpacing: '0.05em',
                }}>
                  ▼ BRECHA
                </div>
              )}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 3.5vw, 2.8rem)',
                color: s.color,
                fontWeight: 700,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.45rem, 1vw, 0.75rem)',
                color: s.sentiment === 'alert' ? s.color : '#ffffff',
                fontWeight: s.sentiment === 'alert' ? 600 : 400,
              }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══ Paradox narrative + Southeast callout ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
          style={{
            textAlign: 'center',
            marginTop: 'clamp(0.3rem, 1vw, 0.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.2rem, 0.6vw, 0.35rem)',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.6rem, 1.4vw, 1rem)',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.4,
          }}>
            Potencia industrial enorme, pero{' '}
            <span style={{ color: '#ef4444', fontWeight: 600 }}>casi nadie usa IA</span>.
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.5rem, 1.1vw, 0.8rem)',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.4,
          }}>
            La inversión tech se concentra en el Bajío y el norte —{' '}
            <span style={{ color: '#ff4a33', fontWeight: 600 }}>el sureste está prácticamente ausente</span>.
            <br />
            La oportunidad está donde nadie lo está haciendo todavía.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
