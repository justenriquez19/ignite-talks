import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

const tools = [
  { label: 'Base de\ndatos', icon: '🗄️' },
  { label: 'Email', icon: '📧' },
  { label: 'Calendario', icon: '📅' },
  { label: 'WhatsApp', icon: '💬' },
  { label: 'ERP', icon: '🏢' },
  { label: 'APIs', icon: '🔗' },
];

const companies = [
  { name: 'Anthropic', color: '#d97706' },
  { name: 'OpenAI', color: '#10b981' },
  { name: 'Google', color: '#3b82f6' },
  { name: 'Microsoft', color: '#06b6d4' },
];

/* ─── Layout constants (all in viewBox units) ─── */
const VB = 500;          // viewBox size (square)
const CX = VB / 2;       // center X
const CY = VB / 2;       // center Y
const RADIUS = 180;      // distance from center to each node
const NODE_SIZE = 110;    // node box size
const BRAIN_SIZE = 80;    // brain circle diameter

/**
 * Compute (x, y) for a node at `index` out of `total`,
 * evenly spaced on a circle starting from the top (−90°).
 */
function nodePos(index: number, total: number) {
  const angleDeg = (360 / total) * index - 90;
  const angleRad = angleDeg * (Math.PI / 180);
  return {
    x: CX + Math.cos(angleRad) * RADIUS,
    y: CY + Math.sin(angleRad) * RADIUS,
  };
}

export default function Slide09MCP(): ReactNode {
  const [connected, setConnected] = useState(0);

  useEffect(() => {
    const timers = tools.map((_, i) =>
      setTimeout(() => setConnected(i + 1), 600 + i * 400)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '900px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label">
          El estándar universal
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
          MCP: El{' '}
          <span style={{ color: 'var(--neon-cyan)' }}>USB-C</span>
          {' '}de la IA
        </motion.h2>

        {/*
          Hub diagram — 100% SVG approach.
          Everything lives in a single <svg> with a shared coordinate system,
          so alignment is guaranteed by construction.
        */}
        <svg
          viewBox={`0 0 ${VB} ${VB}`}
          style={{
            width: '100%',
            maxWidth: '480px',
            margin: '0 auto',
            display: 'block',
            overflow: 'visible',
          }}
        >
          {/* Connection lines */}
          {tools.map((tool, i) => {
            const pos = nodePos(i, tools.length);
            const isConn = i < connected;
            return (
              <line
                key={`line-${tool.label}`}
                x1={CX}
                y1={CY}
                x2={pos.x}
                y2={pos.y}
                stroke={isConn ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.06)'}
                strokeWidth={isConn ? 1.5 : 1}
                strokeDasharray={isConn ? 'none' : '5 5'}
                style={{ transition: 'all 0.5s ease' }}
              />
            );
          })}

          {/* Center brain circle */}
          <circle
            cx={CX}
            cy={CY}
            r={BRAIN_SIZE / 2}
            fill="url(#brainGrad)"
            stroke="rgba(0,212,255,0.4)"
            strokeWidth="2"
          />
          <defs>
            <radialGradient id="brainGrad">
              <stop offset="0%" stopColor="rgba(168,85,247,0.2)" />
              <stop offset="100%" stopColor="rgba(0,212,255,0.1)" />
            </radialGradient>
          </defs>
          {/* Brain emoji */}
          <text
            x={CX}
            y={CY}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="36"
            style={{ pointerEvents: 'none' }}
          >
            🧠
          </text>

          {/* Tool nodes */}
          {tools.map((tool, i) => {
            const pos = nodePos(i, tools.length);
            const isConn = i < connected;
            const half = NODE_SIZE / 2;

            return (
              <g
                key={tool.label}
                style={{
                  opacity: isConn ? 1 : 0.2,
                  transition: 'opacity 0.4s ease',
                }}
              >
                {/* Node background */}
                <rect
                  x={pos.x - half}
                  y={pos.y - half}
                  width={NODE_SIZE}
                  height={NODE_SIZE}
                  rx={12}
                  ry={12}
                  fill={isConn ? 'rgba(15,23,42,0.9)' : 'transparent'}
                  stroke={isConn ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.1)'}
                  strokeWidth="1"
                  style={{ transition: 'all 0.5s ease' }}
                />
                {/* Icon */}
                <text
                  x={pos.x}
                  y={pos.y - 12}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="34"
                  style={{ pointerEvents: 'none' }}
                >
                  {tool.icon}
                </text>
                {/* Label — split multi-word labels into two lines */}
                <text
                  x={pos.x}
                  y={pos.y + 22}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="13"
                  fill="#ffffff"
                  fontFamily="var(--font-mono)"
                  style={{ pointerEvents: 'none' }}
                >
                  {tool.label.includes('\n') ? (
                    tool.label.split('\n').map((line, wi) => (
                      <tspan
                        key={wi}
                        x={pos.x}
                        dy={wi === 0 ? 0 : 14}
                      >
                        {line}
                      </tspan>
                    ))
                  ) : (
                    tool.label
                  )}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Stats + Companies */}
        <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 2rem)', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <span className="slide-stat" style={{ fontSize: 'clamp(0.85rem, 2vw, 1.75rem)' }}>5,800+ servidores</span>
          <span className="slide-stat" style={{ fontSize: 'clamp(0.85rem, 2vw, 1.75rem)' }}>97M descargas/mes</span>
        </div>

        <div style={{ display: 'flex', gap: 'clamp(0.5rem, 1.5vw, 1rem)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {companies.map(c => (
            <span key={c.name} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 1.4vw, 1.2rem)',
              color: c.color,
              padding: 'clamp(0.2rem, 0.5vw, 0.25rem) clamp(0.5rem, 1.5vw, 0.75rem)',
              background: `${c.color}10`,
              borderRadius: '20px',
              border: `1px solid ${c.color}30`,
            }}>
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
