import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const layers = [
  {
    name: 'Deploy',
    items: 'Vercel · AWS · Docker',
    color: '#06d6a0',
    module: 'Módulo V',
    detail: 'Despliegue y operaciones. Llevar tu código al mundo real.',
  },
  {
    name: 'Agentes',
    items: 'MCP · LangChain · CrewAI',
    color: '#ec4899',
    module: 'Módulo IV-V',
    detail: 'Sistemas que actúan autónomamente. El futuro del software.',
  },
  {
    name: 'LLMs',
    items: 'OpenAI · Anthropic · Open Source',
    color: '#a855f7',
    module: 'Módulo III-IV',
    detail: 'Modelos de lenguaje. La base de la IA generativa.',
  },
  {
    name: 'ML',
    items: 'scikit-learn · TensorFlow · PyTorch',
    color: '#f59e0b',
    module: 'Módulo II-III',
    detail: 'Machine Learning clásico. Clasificación, predicción, clustering.',
  },
  {
    name: 'Datos',
    items: 'Pandas · SQL · NoSQL',
    color: '#00d4ff',
    module: 'Módulo I-II',
    detail: 'Sin datos no hay IA. Aprender a manejarlos es fundamental.',
  },
  {
    name: 'Base',
    items: 'Python · JavaScript · Git',
    color: '#64748b',
    module: 'Módulo I',
    detail: 'Fundamentos de programación. Todo empieza aquí.',
  },
];

export default function Slide18Stack(): ReactNode {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '900px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label">
          El mapa completo
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
          El Stack del Constructor de IA
        </motion.h2>

        <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 1.5rem)', width: '100%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
          {/* Stack tower */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: '1',
            minWidth: '280px',
            maxWidth: '450px',
          }}>
            {layers.map((layer, i) => (
              <motion.button
                key={layer.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setHovered(hovered === i ? null : i)}
                style={{
                  width: '100%',
                  padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1.25rem)',
                  background: hovered === i ? `${layer.color}15` : 'var(--color-slide-surface)',
                  border: `1px solid ${hovered === i ? `${layer.color}40` : 'var(--color-slide-border)'}`,
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  textAlign: 'left',
                  boxShadow: hovered === i ? `0 0 20px ${layer.color}10` : 'none',
                }}
              >
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(0.85rem, 1.8vw, 1.5rem)',
                    color: hovered === i ? layer.color : 'var(--color-ignite-text-primary)',
                    fontWeight: 600,
                    transition: 'color 0.3s ease',
                  }}>{layer.name}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.55rem, 1.2vw, 1rem)',
                    color: '#ffffff',
                    marginTop: '2px',
                  }}>{layer.items}</div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.5rem, 1.1vw, 0.9rem)',
                  color: layer.color,
                  opacity: 0.7,
                }}>{layer.module}</div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <div style={{
            flex: '1',
            minWidth: '200px',
            maxWidth: '300px',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <AnimatePresence mode="wait">
              {hovered !== null && (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                    background: `${layers[hovered].color}08`,
                    border: `1px solid ${layers[hovered].color}25`,
                    borderRadius: '16px',
                    width: '100%',
                  }}
                >
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
                    color: layers[hovered].color,
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                  }}>{layers[hovered].name}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.8rem, 1.7vw, 1.4rem)',
                    color: 'var(--color-ignite-text-primary)',
                    lineHeight: 1.5,
                    marginBottom: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                  }}>{layers[hovered].detail}</p>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.65rem, 1.4vw, 1.2rem)',
                    color: '#ffffff',
                    padding: 'clamp(0.15rem, 0.5vw, 0.25rem) clamp(0.3rem, 1vw, 0.5rem)',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '6px',
                  }}>
                    📚 {layers[hovered].module}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {hovered === null && (
              <div style={{
                width: '100%',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.7rem, 1.5vw, 1.25rem)',
                color: '#ffffff',
                opacity: 0.5,
              }}>
                ← Hover/click en cada capa
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
