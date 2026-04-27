import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

/* Simple QR Code SVG generator (deterministic pattern for demo) */
function QRCode({ url, size = 80 }: { url: string; size?: number }) {
  // Generate a simple hash-based pattern
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) - hash) + url.charCodeAt(i);
    hash = hash & hash;
  }

  const modules = 21;
  const cellSize = size / modules;
  const cells: boolean[][] = [];

  for (let y = 0; y < modules; y++) {
    cells[y] = [];
    for (let x = 0; x < modules; x++) {
      // Position detection patterns (corners)
      const inTL = x < 7 && y < 7;
      const inTR = x >= modules - 7 && y < 7;
      const inBL = x < 7 && y >= modules - 7;

      if (inTL || inTR || inBL) {
        const cornerX = inTL ? 0 : inTR ? modules - 7 : 0;
        const cornerY = inTL ? 0 : inTR ? 0 : modules - 7;
        const lx = x - cornerX;
        const ly = y - cornerY;
        cells[y][x] = lx === 0 || lx === 6 || ly === 0 || ly === 6 ||
                      (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
      } else {
        // Pseudo-random data based on hash + position
        const seed = Math.abs(hash + x * 31 + y * 17 + x * y * 7);
        cells[y][x] = (seed % 3) !== 0;
      }
    }
  }

  return (
    <div className="qr-container">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {cells.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <rect
                key={`${x}-${y}`}
                x={x * cellSize}
                y={y * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#111"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}

const actions = [
  {
    title: 'Instala Python y crea tu primer script con IA',
    description: 'python.org → instalar → escribir tu primer programa',
    url: 'https://python.org',
    color: '#00d4ff',
    emoji: '🐍',
    hasQR: true,
  },
  {
    title: 'Abre una cuenta en Claude o ChatGPT y rompe cosas',
    description: 'Experimenta. Pregunta. Equivócate. Aprende.',
    url: 'https://claude.ai',
    color: '#a855f7',
    emoji: '🧪',
    hasQR: true,
  },
  {
    title: 'Construye algo que resuelva un problema real de tu comunidad',
    description: 'El mejor proyecto es el que a ti te importa.',
    url: '',
    color: '#ec4899',
    emoji: '🔥',
    hasQR: false,
  },
];

export default function Slide21Actions(): ReactNode {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = actions.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 600 + i * 800)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '900px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 7vw, 5rem)',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          3 cosas para hacer <span style={{ color: 'var(--neon-cyan)' }}>HOY</span>
        </motion.h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
          width: '100%',
        }}>
          {actions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: -30 }}
              animate={i < visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                padding: 'clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 2.5vw, 1.5rem)',
                background: `${action.color}06`,
                border: `1px solid ${action.color}20`,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.75rem, 2vw, 1.25rem)',
              }}
            >
              <div style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
                width: 'clamp(40px, 8vw, 56px)',
                height: 'clamp(40px, 8vw, 56px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `${action.color}10`,
                borderRadius: '12px',
                flexShrink: 0,
              }}>
                {action.emoji}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.95rem, 2.5vw, 2rem)',
                  color: 'var(--color-ignite-text-primary)',
                  fontWeight: 600,
                  marginBottom: '0.25rem',
                }}>
                  <span style={{ color: action.color, marginRight: '0.5rem' }}>{i + 1}.</span>
                  {action.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.7rem, 1.5vw, 1.25rem)',
                  color: '#ffffff',
                }}>
                  {action.description}
                </div>
              </div>

              {action.hasQR && (
                <div style={{ flexShrink: 0 }}>
                  <QRCode url={action.url} size={60} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visible >= 3 ? 1 : 0 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.7rem, 1.5vw, 1.25rem)',
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          No esperen a que les enseñen todo. Empiecen hoy.
        </motion.p>
      </div>
    </div>
  );
}
