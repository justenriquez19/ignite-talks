import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* Simulated vibration data generator */
function generateData(count: number, threshold: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < count; i++) {
    const base = 30 + Math.sin(i * 0.1) * 10;
    const noise = (Math.random() - 0.5) * 8;
    const trend = i > count * 0.6 ? (i - count * 0.6) * 0.4 : 0;
    data.push(Math.min(base + noise + trend, threshold + 15));
  }
  return data;
}

function VibrationChart({ dataPoints, threshold }: { dataPoints: number[]; threshold: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const dw = canvas.offsetWidth;
    const dh = canvas.offsetHeight;

    ctx.clearRect(0, 0, dw, dh);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let y = 0; y < dh; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(dw, y); ctx.stroke();
    }

    // Threshold line
    const threshY = dh - (threshold / 100) * dh;
    ctx.strokeStyle = 'rgba(239,68,68,0.5)';
    ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(0, threshY); ctx.lineTo(dw, threshY); ctx.stroke();
    ctx.setLineDash([]);

    // Label
    ctx.fillStyle = '#ef4444';
    ctx.font = '10px monospace';
    ctx.fillText('UMBRAL', dw - 55, threshY - 5);

    // Data line
    ctx.beginPath();
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 2;
    dataPoints.forEach((val, i) => {
      const x = (i / (dataPoints.length - 1)) * dw;
      const y = dh - (val / 100) * dh;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Glow area under line where above threshold
    ctx.beginPath();
    let aboveStart = -1;
    dataPoints.forEach((val, i) => {
      const x = (i / (dataPoints.length - 1)) * dw;
      const y = dh - (val / 100) * dh;
      if (val >= threshold && aboveStart === -1) aboveStart = i;
      if (val >= threshold) {
        if (aboveStart === i) ctx.moveTo(x, threshY);
        ctx.lineTo(x, y);
      }
    });
    if (aboveStart !== -1) {
      const lastX = ((dataPoints.length - 1) / (dataPoints.length - 1)) * dw;
      ctx.lineTo(lastX, threshY);
      ctx.closePath();
      ctx.fillStyle = 'rgba(239,68,68,0.15)';
      ctx.fill();
    }
  }, [dataPoints, threshold]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', borderRadius: '8px' }}
    />
  );
}

interface Slide06PredictProps {
  subStep?: number;
}

export default function Slide06Predict({ subStep = 0 }: Slide06PredictProps): ReactNode {
  const [sliderVal, setSliderVal] = useState(50);
  const threshold = 65;
  const dataCount = 40 + Math.floor(sliderVal * 0.6);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    setData(generateData(dataCount, threshold));
  }, [dataCount]);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '950px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="slide-label"
          style={{ color: 'var(--neon-cyan)' }}
        >
          🔮 Pilar 1 — Predecir
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 7vw, 5rem)',
            fontWeight: 700,
            color: 'var(--color-ignite-text-primary)',
            textAlign: 'center',
          }}
        >
          Mantenimiento Predictivo
        </motion.h2>

        {/* Chart area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            width: '100%',
            height: '220px',
            background: 'var(--color-slide-surface)',
            borderRadius: '16px',
            border: '1px solid var(--color-slide-border)',
            padding: 'clamp(0.5rem, 2vw, 1rem)',
            position: 'relative',
          }}
        >
          <VibrationChart dataPoints={data} threshold={threshold} />

          {/* Sensor indicators */}
          <div style={{
            position: 'absolute',
            top: '0.5rem',
            left: '1rem',
            display: 'flex',
            gap: '0.5rem',
          }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#06d6a0',
                animation: 'neon-pulse 2s ease-in-out infinite',
                animationDelay: `${s * 0.3}s`,
              }} />
            ))}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.55rem, 1.2vw, 1rem)', color: '#ffffff' }}>
              Sensores IoT activos
            </span>
          </div>
        </motion.div>

        {/* Slider + Stats */}
        <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 2rem)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.65rem, 1.4vw, 1.2rem)', color: '#ffffff', display: 'block', marginBottom: '0.5rem' }}>
              Datos disponibles: {dataCount} muestras
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--neon-cyan)' }}
            />
          </div>
          <div style={{
            padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1.25rem)',
            background: 'rgba(0,212,255,0.08)',
            borderRadius: '10px',
            border: '1px solid rgba(0,212,255,0.2)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.85rem, 1.8vw, 1.75rem)',
            color: 'var(--neon-cyan)',
          }}>
            ↓45% tiempo de paro
          </div>
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.7rem, 1.4vw, 1.4rem)',
          color: '#ffffff',
          textAlign: 'center',
        }}>
          60% de fabricantes ya redujeron tiempo de inactividad al menos 26%
        </p>
      </div>

      {/* ─── FULLSCREEN CRITICAL ALARM (subStep >= 1) ─── */}
      <AnimatePresence>
        {subStep >= 1 && (
          <motion.div
            key="critical-alarm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(10, 0, 0, 0.92)',
              animation: 'critical-alarm-breathe 1.5s ease-in-out infinite',
            }}
          >
            {/* Scanlines overlay for drama */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.03) 2px, rgba(255,0,0,0.03) 4px)',
              pointerEvents: 'none',
            }} />

            {/* Glowing border frame */}
            <div style={{
              position: 'absolute',
              inset: '12px',
              border: '2px solid rgba(239, 68, 68, 0.6)',
              borderRadius: '16px',
              animation: 'critical-border-pulse 1.5s ease-in-out infinite',
              pointerEvents: 'none',
            }} />

            {/* Error icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              style={{
                width: 'clamp(80px, 15vw, 140px)',
                height: 'clamp(80px, 15vw, 140px)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(239,68,68,0.3), rgba(239,68,68,0.05))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'clamp(1rem, 3vw, 2rem)',
                animation: 'critical-icon-pulse 1.5s ease-in-out infinite',
              }}
            >
              <span style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.8))',
              }}>
                ⚠️
              </span>
            </motion.div>

            {/* CRITICAL ERROR label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.7rem, 1.8vw, 1.2rem)',
                fontWeight: 700,
                letterSpacing: '0.35em',
                color: '#ef4444',
                textTransform: 'uppercase',
                marginBottom: 'clamp(0.5rem, 1.5vw, 1rem)',
                textShadow: '0 0 20px rgba(239,68,68,0.6)',
              }}
            >
              ⬤ CRITICAL ERROR
            </motion.div>

            {/* Main error message */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.6, type: 'spring', stiffness: 120 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 8vw, 6rem)',
                fontWeight: 800,
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 1.1,
                textShadow: '0 0 40px rgba(239,68,68,0.4)',
                padding: '0 1rem',
              }}
            >
              Fallo predicho
              <br />
              <span style={{ color: '#ef4444' }}>en 72 hrs</span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.75rem, 2vw, 1.4rem)',
                color: 'rgba(239,68,68,0.7)',
                textAlign: 'center',
                marginTop: 'clamp(1rem, 2vw, 1.5rem)',
                letterSpacing: '0.1em',
              }}
            >
              MOTOR #3 — LÍNEA DE PRODUCCIÓN A
            </motion.p>

            {/* Blinking status bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center',
                padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 2rem)',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '8px',
              }}
            >
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#ef4444',
                animation: 'blink-cursor 1s step-end infinite',
                boxShadow: '0 0 8px rgba(239,68,68,0.8)',
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.65rem, 1.5vw, 1.1rem)',
                color: '#ef4444',
                letterSpacing: '0.08em',
              }}>
                ACCIÓN REQUERIDA — PROGRAMAR MANTENIMIENTO
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
