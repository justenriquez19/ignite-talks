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
        padding: 'clamp(0.625rem, 1.5vw, 0.875rem) clamp(0.75rem, 2vw, 1rem)',
        background: '#1f2c34',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0.625rem, 1.5vw, 0.75rem)',
      }}>
        <img
          src="/images/justme/relevia_profile_pic.jpg"
          alt="Relevia"
          style={{
            width: 'clamp(48px, 8vw, 56px)',
            height: 'clamp(48px, 8vw, 56px)',
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
        <div style={{ minWidth: 0, flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: '#e4e6eb', fontWeight: 600 }}>Relevia</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.8rem, 1.6vw, 1rem)', color: '#06d6a0' }}>✨ Reina · Asistente IA</div>
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
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: 'clamp(0.5rem, 1.5vw, 1rem)',
            flexWrap: 'wrap',
          }}
        >
          <svg
            viewBox="0 0 135 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Relevia Logo"
            style={{ verticalAlign: 'baseline', position: 'relative', top: '2px', width: 'clamp(120px, 22vw, 300px)', height: 'auto' }}
          >
            <g clipPath="url(#clip0_slide14)">
              <path d="M14.3964 7.04829H4.48159C2.01691 7.04829 0 9.01187 0 11.4114V20.6369C0 23.0364 2.01691 25 4.48159 25H14.3964C16.8611 25 18.878 23.0364 18.878 20.6369V11.4114C18.878 9.01187 16.8611 7.04829 14.3964 7.04829ZM3.09616 17.4444L3.12359 15.5242L5.64823 15.5584L8.29534 13.8426L5.69798 12.0454L3.17334 12.0113L3.20077 10.0912L6.34286 10.1334L10.7434 13.1787L10.7237 14.5605L6.23889 17.486L3.09616 17.4444ZM12.6398 21.9571L8.15501 19.0316L8.13524 17.6499L12.5358 14.6045L15.6779 14.5623L15.7053 16.4824L13.1807 16.5166L10.5833 18.3138L13.2304 20.0296L15.7551 19.9954L15.7825 21.9155L12.6398 21.9571Z" fill="#ffffff" />
              <path d="M29.3829 13.4501V24.6019H32.761V13.4501C32.761 11.6418 34.2721 10.1694 36.1295 10.1694V6.88062C32.4095 6.88062 29.3829 9.82848 29.3829 13.4501Z" fill="#ffffff" />
              <path d="M53.4544 9.48445C52.6086 8.66163 51.6244 8.01456 50.5266 7.56434C48.2533 6.62788 45.6304 6.62725 43.3545 7.56434C42.2581 8.0158 41.2738 8.66163 40.4268 9.48569C39.5816 10.3091 38.9182 11.2673 38.4532 12.3361C37.9729 13.4427 37.7286 14.617 37.7286 15.8267C37.7286 17.037 37.9729 18.2107 38.4532 19.3173C38.917 20.3835 39.5803 21.343 40.4268 22.1676C41.2713 22.9892 42.2562 23.6363 43.3545 24.089C44.4899 24.5566 45.6974 24.7932 46.9399 24.7932C48.1825 24.7932 49.39 24.5554 50.5266 24.0878C51.6244 23.6351 52.6092 22.988 53.4531 22.1664L51.0637 19.8414C50.5285 20.3637 49.9041 20.7729 49.2094 21.0592C47.7762 21.6497 46.105 21.651 44.6704 21.0592C43.9758 20.7729 43.3514 20.3618 42.8149 19.8414C42.2785 19.3179 41.8569 18.7099 41.5634 18.0349C41.4837 17.8492 41.4135 17.6611 41.3536 17.4698C41.3536 17.4698 40.8478 15.4808 41.3561 14.1823H41.3549V14.181C41.4142 13.9898 41.485 13.8004 41.5647 13.6159C41.8588 12.9397 42.2798 12.333 42.8149 11.8107C43.3526 11.2884 43.9758 10.8792 44.6692 10.5935C46.1075 10.0017 47.7736 10.0017 49.2107 10.5935C49.9053 10.8792 50.5285 11.2884 51.065 11.8107C51.602 12.333 52.023 12.9409 52.3164 13.6159C52.3975 13.8016 52.4663 13.9904 52.5276 14.1823H46.3327C46.3518 14.4474 46.3327 17.0575 46.3295 17.4698H56.1506V15.826L56.1519 15.8248C56.1519 14.6157 55.9076 13.4408 55.4273 12.3342C54.9636 11.2673 54.3002 10.3079 53.4544 9.48445Z" fill="#ffffff" />
              <path d="M62.5509 18.2076V0.828407H59.1728V18.2076C59.1728 21.8292 62.2007 24.7758 65.9207 24.7758V21.487C64.0632 21.4877 62.5509 20.0165 62.5509 18.2076Z" fill="#ffffff" />
              <path d="M83.3016 9.48445C82.4558 8.66163 81.4716 8.01456 80.3739 7.56434C78.1006 6.62788 75.4777 6.62725 73.2018 7.56434C72.1053 8.0158 71.1211 8.66163 70.274 9.48569C69.4289 10.3091 68.7655 11.2673 68.3005 12.3361C67.8202 13.4427 67.5759 14.617 67.5759 15.8267C67.5759 17.037 67.8202 18.2107 68.3005 19.3173C68.7642 20.3835 69.4276 21.343 70.274 22.1676C71.1186 22.9892 72.1034 23.6363 73.2018 24.089C74.3372 24.5566 75.5447 24.7932 76.7872 24.7932C78.0298 24.7932 79.2372 24.5554 80.3739 24.0878C81.4716 23.6351 82.4565 22.988 83.3004 22.1664L80.911 19.8414C80.3758 20.3637 79.7513 20.7729 79.0567 21.0592C77.6234 21.6497 75.9523 21.651 74.5177 21.0592C73.8231 20.7729 73.1986 20.3618 72.6622 19.8414C72.1257 19.3179 71.7041 18.7099 71.4107 18.0349C71.331 17.8492 71.2245 17.4698 71.2245 17.4698C70.658 15.5391 71.2021 14.181 71.2021 14.181C71.2615 13.9898 71.3323 13.8004 71.412 13.6159C71.706 12.9397 72.127 12.333 72.6622 11.8107C73.1999 11.2884 73.8231 10.8792 74.5164 10.5935C75.9548 10.0017 77.6209 10.0017 79.058 10.5935C79.7526 10.8792 80.3758 11.2884 80.9122 11.8107C81.4493 12.333 81.8703 12.9409 82.1637 13.6159C82.2447 13.8016 82.3136 13.9904 82.3748 14.1823H76.1953C76.2163 14.3338 76.1972 17.0035 76.194 17.4698H85.9985V15.826L85.9998 15.8248C85.9998 14.6157 85.7555 13.4408 85.2752 12.3342C84.8115 11.2673 84.1481 10.3079 83.3016 9.48445Z" fill="#ffffff" />
              <path d="M103.021 15.4485L97.1878 20.7375L91.3546 15.4485V7.52832H87.9765V16.1632C87.9765 16.6203 88.1717 17.0556 88.5148 17.3661L96.0365 24.1865C96.3605 24.4802 96.7738 24.6274 97.1878 24.6274C97.6011 24.6274 98.0145 24.4802 98.3391 24.1865L105.861 17.3661C106.204 17.055 106.399 16.6191 106.399 16.1632V7.52832H103.021V15.4485Z" fill="#ffffff" />
              <path d="M111.514 0C110.118 0 108.987 1.10164 108.987 2.46038C108.987 3.81912 110.118 4.92076 111.514 4.92076C112.91 4.92076 114.041 3.81912 114.041 2.46038C114.041 1.10164 112.91 0 111.514 0Z" fill="#ffffff" />
              <path d="M113.202 7.33084H109.824V24.6026H113.202V7.33084Z" fill="#ffffff" />
              <path d="M125.789 6.85764V6.85888C120.71 6.85888 116.579 10.8811 116.579 15.8254C116.579 20.7698 120.71 24.792 125.789 24.792C125.801 24.792 125.812 24.7907 125.826 24.7895C129.386 24.7684 131.427 22.4446 131.427 22.4446H131.622V24.4585H135V15.8242C135 10.8798 130.867 6.85764 125.789 6.85764ZM125.789 21.5044C122.573 21.5044 119.955 18.9571 119.955 15.8254C119.955 12.6938 122.572 10.1464 125.789 10.1464C129.005 10.1464 131.622 12.6938 131.622 15.8254C131.622 18.9571 129.005 21.5044 125.789 21.5044Z" fill="#ffffff" />
            </g>
            <defs>
              <clipPath id="clip0_slide14">
                <rect width="135" height="25" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span style={{ color: '#ffffff' }}>en</span>{' '}<span style={{ color: '#6627b9' }}>Chetumal</span>
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
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem, 2vw, 1.75rem)', color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'baseline', gap: 'clamp(0.3rem, 0.6vw, 0.5rem)', flexWrap: 'wrap' }}>
                ¿<span style={{ color: '#5820a2' }}>Qué</span> es
                <svg viewBox="0 0 135 25" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Relevia Logo" style={{ width: 'clamp(70px, 12vw, 150px)', height: 'auto', verticalAlign: 'baseline', position: 'relative', top: '1px' }}>
                  <g clipPath="url(#clip0_slide14_h3)">
                    <path d="M14.3964 7.04829H4.48159C2.01691 7.04829 0 9.01187 0 11.4114V20.6369C0 23.0364 2.01691 25 4.48159 25H14.3964C16.8611 25 18.878 23.0364 18.878 20.6369V11.4114C18.878 9.01187 16.8611 7.04829 14.3964 7.04829ZM3.09616 17.4444L3.12359 15.5242L5.64823 15.5584L8.29534 13.8426L5.69798 12.0454L3.17334 12.0113L3.20077 10.0912L6.34286 10.1334L10.7434 13.1787L10.7237 14.5605L6.23889 17.486L3.09616 17.4444ZM12.6398 21.9571L8.15501 19.0316L8.13524 17.6499L12.5358 14.6045L15.6779 14.5623L15.7053 16.4824L13.1807 16.5166L10.5833 18.3138L13.2304 20.0296L15.7551 19.9954L15.7825 21.9155L12.6398 21.9571Z" fill="#ffffff" />
                    <path d="M29.3829 13.4501V24.6019H32.761V13.4501C32.761 11.6418 34.2721 10.1694 36.1295 10.1694V6.88062C32.4095 6.88062 29.3829 9.82848 29.3829 13.4501Z" fill="#ffffff" />
                    <path d="M53.4544 9.48445C52.6086 8.66163 51.6244 8.01456 50.5266 7.56434C48.2533 6.62788 45.6304 6.62725 43.3545 7.56434C42.2581 8.0158 41.2738 8.66163 40.4268 9.48569C39.5816 10.3091 38.9182 11.2673 38.4532 12.3361C37.9729 13.4427 37.7286 14.617 37.7286 15.8267C37.7286 17.037 37.9729 18.2107 38.4532 19.3173C38.917 20.3835 39.5803 21.343 40.4268 22.1676C41.2713 22.9892 42.2562 23.6363 43.3545 24.089C44.4899 24.5566 45.6974 24.7932 46.9399 24.7932C48.1825 24.7932 49.39 24.5554 50.5266 24.0878C51.6244 23.6351 52.6092 22.988 53.4531 22.1664L51.0637 19.8414C50.5285 20.3637 49.9041 20.7729 49.2094 21.0592C47.7762 21.6497 46.105 21.651 44.6704 21.0592C43.9758 20.7729 43.3514 20.3618 42.8149 19.8414C42.2785 19.3179 41.8569 18.7099 41.5634 18.0349C41.4837 17.8492 41.4135 17.6611 41.3536 17.4698C41.3536 17.4698 40.8478 15.4808 41.3561 14.1823H41.3549V14.181C41.4142 13.9898 41.485 13.8004 41.5647 13.6159C41.8588 12.9397 42.2798 12.333 42.8149 11.8107C43.3526 11.2884 43.9758 10.8792 44.6692 10.5935C46.1075 10.0017 47.7736 10.0017 49.2107 10.5935C49.9053 10.8792 50.5285 11.2884 51.065 11.8107C51.602 12.333 52.023 12.9409 52.3164 13.6159C52.3975 13.8016 52.4663 13.9904 52.5276 14.1823H46.3327C46.3518 14.4474 46.3327 17.0575 46.3295 17.4698H56.1506V15.826L56.1519 15.8248C56.1519 14.6157 55.9076 13.4408 55.4273 12.3342C54.9636 11.2673 54.3002 10.3079 53.4544 9.48445Z" fill="#ffffff" />
                    <path d="M62.5509 18.2076V0.828407H59.1728V18.2076C59.1728 21.8292 62.2007 24.7758 65.9207 24.7758V21.487C64.0632 21.4877 62.5509 20.0165 62.5509 18.2076Z" fill="#ffffff" />
                    <path d="M83.3016 9.48445C82.4558 8.66163 81.4716 8.01456 80.3739 7.56434C78.1006 6.62788 75.4777 6.62725 73.2018 7.56434C72.1053 8.0158 71.1211 8.66163 70.274 9.48569C69.4289 10.3091 68.7655 11.2673 68.3005 12.3361C67.8202 13.4427 67.5759 14.617 67.5759 15.8267C67.5759 17.037 67.8202 18.2107 68.3005 19.3173C68.7642 20.3835 69.4276 21.343 70.274 22.1676C71.1186 22.9892 72.1034 23.6363 73.2018 24.089C74.3372 24.5566 75.5447 24.7932 76.7872 24.7932C78.0298 24.7932 79.2372 24.5554 80.3739 24.0878C81.4716 23.6351 82.4565 22.988 83.3004 22.1664L80.911 19.8414C80.3758 20.3637 79.7513 20.7729 79.0567 21.0592C77.6234 21.6497 75.9523 21.651 74.5177 21.0592C73.8231 20.7729 73.1986 20.3618 72.6622 19.8414C72.1257 19.3179 71.7041 18.7099 71.4107 18.0349C71.331 17.8492 71.2245 17.4698 71.2245 17.4698C70.658 15.5391 71.2021 14.181 71.2021 14.181C71.2615 13.9898 71.3323 13.8004 71.412 13.6159C71.706 12.9397 72.127 12.333 72.6622 11.8107C73.1999 11.2884 73.8231 10.8792 74.5164 10.5935C75.9548 10.0017 77.6209 10.0017 79.058 10.5935C79.7526 10.8792 80.3758 11.2884 80.9122 11.8107C81.4493 12.333 81.8703 12.9409 82.1637 13.6159C82.2447 13.8016 82.3136 13.9904 82.3748 14.1823H76.1953C76.2163 14.3338 76.1972 17.0035 76.194 17.4698H85.9985V15.826L85.9998 15.8248C85.9998 14.6157 85.7555 13.4408 85.2752 12.3342C84.8115 11.2673 84.1481 10.3079 83.3016 9.48445Z" fill="#ffffff" />
                    <path d="M103.021 15.4485L97.1878 20.7375L91.3546 15.4485V7.52832H87.9765V16.1632C87.9765 16.6203 88.1717 17.0556 88.5148 17.3661L96.0365 24.1865C96.3605 24.4802 96.7738 24.6274 97.1878 24.6274C97.6011 24.6274 98.0145 24.4802 98.3391 24.1865L105.861 17.3661C106.204 17.055 106.399 16.6191 106.399 16.1632V7.52832H103.021V15.4485Z" fill="#ffffff" />
                    <path d="M111.514 0C110.118 0 108.987 1.10164 108.987 2.46038C108.987 3.81912 110.118 4.92076 111.514 4.92076C112.91 4.92076 114.041 3.81912 114.041 2.46038C114.041 1.10164 112.91 0 111.514 0Z" fill="#ffffff" />
                    <path d="M113.202 7.33084H109.824V24.6026H113.202V7.33084Z" fill="#ffffff" />
                    <path d="M125.789 6.85764V6.85888C120.71 6.85888 116.579 10.8811 116.579 15.8254C116.579 20.7698 120.71 24.792 125.789 24.792C125.801 24.792 125.812 24.7907 125.826 24.7895C129.386 24.7684 131.427 22.4446 131.427 22.4446H131.622V24.4585H135V15.8242C135 10.8798 130.867 6.85764 125.789 6.85764ZM125.789 21.5044C122.573 21.5044 119.955 18.9571 119.955 15.8254C119.955 12.6938 122.572 10.1464 125.789 10.1464C129.005 10.1464 131.622 12.6938 131.622 15.8254C131.622 18.9571 129.005 21.5044 125.789 21.5044Z" fill="#ffffff" />
                  </g>
                  <defs>
                    <clipPath id="clip0_slide14_h3">
                      <rect width="135" height="25" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                ?
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
