import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Piece {
  id: number;
  status: 'ok' | 'defect';
  defectType?: string;
  confidence: number;
}

const pieces: Piece[] = [
  { id: 1, status: 'ok', confidence: 99.8 },
  { id: 2, status: 'defect', defectType: 'Grieta superficial', confidence: 98.1 },
  { id: 3, status: 'ok', confidence: 99.5 },
  { id: 4, status: 'ok', confidence: 99.9 },
  { id: 5, status: 'defect', defectType: 'Desalineación 0.3mm', confidence: 97.4 },
  { id: 6, status: 'ok', confidence: 99.7 },
  { id: 7, status: 'ok', confidence: 99.2 },
  { id: 8, status: 'defect', defectType: 'Color fuera de rango', confidence: 95.8 },
  { id: 9, status: 'ok', confidence: 99.6 },
];

function PieceCard({ piece, onClick, isSelected }: { piece: Piece; onClick: () => void; isSelected: boolean }) {
  const borderColor = piece.status === 'ok' ? '#06d6a0' : '#ef4444';
  const bgColor = piece.status === 'ok' ? 'rgba(6,214,160,0.06)' : 'rgba(239,68,68,0.06)';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: '100%',
        aspectRatio: '1',
        background: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        transition: 'box-shadow 0.3s ease',
        boxShadow: isSelected ? `0 0 20px ${borderColor}40` : 'none',
        outline: 'none',
      }}
    >
      {/* Simulated piece shape */}
      <svg width="50%" height="50%" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="4" width="32" height="32" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="20" cy="20" r="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {piece.status === 'defect' && (
          <line x1="8" y1="8" x2="32" y2="32" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        )}
      </svg>

      {/* Status badge */}
      <div style={{
        position: 'absolute',
        top: '4px',
        right: '4px',
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        background: borderColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        color: 'white',
        fontWeight: 700,
      }}>
        {piece.status === 'ok' ? '✓' : '✕'}
      </div>

      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.5rem, 1vw, 0.9rem)',
        color: '#ffffff',
        marginTop: '4px',
      }}>
        #{piece.id}
      </span>
    </motion.button>
  );
}

export default function Slide07Vision(): ReactNode {
  const [selected, setSelected] = useState<Piece | null>(null);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '900px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label" style={{ color: 'var(--neon-purple)' }}>
          👁️ Pilar 2 — Ver
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
          Visión Artificial en Acción
        </motion.h2>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 2rem)', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <span className="slide-stat" style={{ fontSize: 'clamp(0.85rem, 2vw, 1.75rem)' }}>99.2% precisión</span>
          <span className="slide-stat" style={{ fontSize: 'clamp(0.85rem, 2vw, 1.75rem)' }}>5ms por pieza</span>
          <span className="slide-stat" style={{ color: 'var(--neon-green)', fontSize: 'clamp(0.85rem, 2vw, 1.75rem)' }}>
            {pieces.filter(p => p.status === 'ok').length}/{pieces.length} aprobadas
          </span>
        </motion.div>

        <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 1.5rem)', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(0.4rem, 1vw, 0.625rem)',
              flex: '1',
              minWidth: '240px',
              maxWidth: '350px',
            }}
          >
            {pieces.map(p => (
              <PieceCard
                key={p.id}
                piece={p}
                onClick={() => setSelected(p)}
                isSelected={selected?.id === p.id}
              />
            ))}
          </motion.div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{
                  flex: '1',
                  minWidth: '200px',
                  maxWidth: '300px',
                  padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                  background: 'var(--color-slide-surface)',
                  border: `1px solid ${selected.status === 'ok' ? 'rgba(6,214,160,0.3)' : 'rgba(239,68,68,0.3)'}`,
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.7rem, 1.4vw, 1.2rem)', color: '#ffffff' }}>
                  Pieza #{selected.id}
                </div>
                <div style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
                  fontWeight: 700,
                  color: selected.status === 'ok' ? '#06d6a0' : '#ef4444',
                  fontFamily: 'var(--font-display)',
                }}>
                  {selected.status === 'ok' ? '✓ Aprobada' : '✕ Defecto detectado'}
                </div>
                {selected.defectType && (
                  <div style={{
                    padding: 'clamp(0.375rem, 1vw, 0.5rem) clamp(0.5rem, 1.5vw, 0.75rem)',
                    background: 'rgba(239,68,68,0.1)',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.8rem, 1.6vw, 1.4rem)',
                    color: '#fca5a5',
                  }}>
                    {selected.defectType}
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.7rem, 1.4vw, 1.2rem)', color: 'var(--neon-cyan)' }}>
                  Confianza: {selected.confidence}%
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.7rem, 1.4vw, 1.4rem)',
          color: '#ffffff',
          textAlign: 'center',
        }}>
          Click en cada pieza para ver el resultado de inspección
        </p>
      </div>
    </div>
  );
}
