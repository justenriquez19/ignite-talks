import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

interface Message {
  from: 'client' | 'ai';
  text: string;
  time: string;
  delay: number;
}

const releviaConvo: Message[] = [
  { from: 'client', text: 'Hola, me interesa saber qué hacen', time: '10:24', delay: 0 },
  { from: 'ai', text: '¡Hola! 👋 Soy Reina, asistente de Relevia. Creamos asistentes de IA por WhatsApp para negocios. ¿En qué te puedo ayudar?', time: '10:24', delay: 600 },
  { from: 'client', text: 'Tengo una estética, ¿me puede servir?', time: '10:25', delay: 1200 },
  { from: 'ai', text: '¡Claro! 💇 Tu asistente podría:\n\n• Agendar citas automáticamente\n• Responder preguntas frecuentes\n• Enviar recordatorios a tus clientes\n\n¿Te gustaría agendar una demo?', time: '10:25', delay: 1800 },
  { from: 'client', text: 'Sí, por favor', time: '10:26', delay: 2400 },
  { from: 'ai', text: '✅ Perfecto, te paso con nuestro equipo para coordinar tu demostración. ¡Gracias por tu interés! 🚀', time: '10:26', delay: 3000 },
];

function WhatsAppMockup({ messages }: { messages: Message[] }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = messages.map((msg, i) =>
      setTimeout(() => setVisible(i + 1), 800 + msg.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [messages]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '20px',
      overflow: 'hidden',
      background: '#0b141a',
      border: '1px solid #233138',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* WhatsApp header */}
      <div style={{
        padding: '0.625rem 0.75rem',
        background: '#1f2c34',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'white',
        }}>R</div>
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.75rem, 1.6vw, 1.3rem)', color: '#e4e6eb', fontWeight: 600 }}>Relevia</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.5rem, 1vw, 0.85rem)', color: '#06d6a0' }}>✨ Reina · Asistente IA</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.375rem',
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
      }}>
        {messages.slice(0, visible).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={msg.from === 'client' ? 'wa-bubble wa-bubble-outgoing' : 'wa-bubble wa-bubble-incoming'}
            style={{ alignSelf: msg.from === 'client' ? 'flex-end' : 'flex-start', whiteSpace: 'pre-line' }}
          >
            {msg.text}
            <div style={{ fontSize: '0.5rem', color: '#8696a0', textAlign: 'right', marginTop: '2px' }}>{msg.time}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Slide14Relevia(): ReactNode {
  return (
    <div className="slide">
      <div className="slide-inner" style={{ maxWidth: '900px', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="slide-label" style={{ color: 'var(--neon-green)' }}>
          Caso real
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
          <span style={{ color: 'var(--neon-cyan)' }}>Relevia</span> en Chetumal
        </motion.h2>

        <div style={{
          display: 'flex',
          gap: 'clamp(1rem, 3vw, 2rem)',
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}>
          {/* WhatsApp Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '340px',
              minHeight: '360px',
              overflow: 'hidden',
              borderRadius: '20px',
            }}
          >
            <WhatsAppMockup messages={releviaConvo} />
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              flex: 1,
              minWidth: '220px',
              maxWidth: '350px',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.75rem, 2vw, 1rem)',
            }}
          >
            <div style={{
              padding: 'clamp(0.75rem, 2vw, 1rem)',
              background: 'var(--color-slide-surface)',
              borderRadius: '14px',
              border: '1px solid var(--color-slide-border)',
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem, 2vw, 1.75rem)', color: 'var(--neon-cyan)', fontWeight: 600, marginBottom: '0.5rem' }}>
                ¿Qué es Relevia?
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.75rem, 1.6vw, 1.4rem)', color: '#ffffff', lineHeight: 1.5 }}>
                Asistentes de IA por WhatsApp para PyMEs. Atienden clientes, agendan citas y toman pedidos 24/7.
              </p>
            </div>

            {/* Businesses */}
            {[
              { name: 'Relevia', bot: 'Reina', type: 'Ventas & soporte', emoji: '✨' },
              { name: 'Agenda - Adriene DV', bot: 'Verónica', type: 'CANACO Chetumal', emoji: '📅' },
            ].map((biz, i) => (
              <motion.div
                key={biz.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.3 }}
                style={{
                  padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)',
                  background: 'var(--color-slide-surface)',
                  borderRadius: '12px',
                  border: '1px solid var(--color-slide-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                }}
              >
                <span style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)' }}>{biz.emoji}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.8rem, 1.7vw, 1.5rem)', color: 'var(--color-ignite-text-primary)', fontWeight: 600 }}>{biz.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.55rem, 1.2vw, 1rem)', color: '#ffffff' }}>{biz.bot} · {biz.type}</div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              style={{
                padding: 'clamp(0.4rem, 1.2vw, 0.625rem) clamp(0.75rem, 2vw, 1rem)',
                background: 'rgba(6,214,160,0.08)',
                border: '1px solid rgba(6,214,160,0.2)',
                borderRadius: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.7rem, 1.5vw, 1.25rem)',
                color: 'var(--neon-green)',
                textAlign: 'center',
              }}
            >
              Construido aquí, en Chetumal 📍
            </motion.div>


          </motion.div>
        </div>
      </div>
    </div>
  );
}
