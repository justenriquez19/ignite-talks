import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const PRESENTATION_URL = 'https://ignite-talks.vercel.app/talks/ia-procesos-productivos#slide-21';
const QR_API_URL = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&color=0a0a0f&bgcolor=ffffff&format=png&data=${encodeURIComponent(PRESENTATION_URL)}`;
const GITHUB_URL = 'https://github.com/justenriquez19/ignite-talks';

interface SourceEntry { label: string; url: string; }
interface SourceCategory { title: string; sources: SourceEntry[]; }

const SOURCES: SourceCategory[] = [
  {
    title: 'Estado del arte IA 2026 — Tendencias globales',
    sources: [
      { label: 'InfoWorld — "6 AI breakthroughs that will define 2026"', url: 'https://www.infoworld.com/article/4108092/6-ai-breakthroughs-that-will-define-2026.html' },
      { label: 'Microsoft — "What\'s next in AI: 7 trends to watch in 2026"', url: 'https://news.microsoft.com/source/features/ai/whats-next-in-ai-7-trends-to-watch-in-2026/' },
      { label: 'AT&T — "Six AI Predictions for 2026"', url: 'https://about.att.com/blogs/2025/2026-ai-predictions.html' },
      { label: 'PwC — "2026 AI Business Predictions"', url: 'https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-predictions.html' },
      { label: 'IBM — "The trends that will shape AI and tech in 2026"', url: 'https://www.ibm.com/think/news/ai-tech-trends-predictions-2026' },
      { label: 'Deloitte — "The State of AI in the Enterprise 2026"', url: 'https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html' },
      { label: 'IBM — "The future of AI: trends shaping the next 10 years"', url: 'https://www.ibm.com/think/insights/artificial-intelligence-future' },
    ],
  },
  {
    title: 'MCP y protocolos agénticos',
    sources: [
      { label: 'DEV Community — "MCP vs A2A: The Complete Guide to AI Agent Protocols in 2026"', url: 'https://dev.to/pockit_tools/mcp-vs-a2a-the-complete-guide-to-ai-agent-protocols-in-2026-30li' },
      { label: 'DEV Community — "MCP Explained: How AI Agents Actually Work (2026)"', url: 'https://dev.to/aristoaistack/mcp-explained-how-ai-agents-actually-work-2026-5p8' },
      { label: 'AgileSoftLabs — "How AI Agents Use MCP for Enterprise Systems 2026"', url: 'https://www.agilesoftlabs.com/blog/2026/02/how-ai-agents-use-mcp-for-enterprise' },
      { label: 'FifthRow — "AI Agent Orchestration Goes Enterprise: April 2026"', url: 'https://www.fifthrow.com/blog/ai-agent-orchestration-goes-enterprise-the-april-2026-playbook-for-systematic-innovation-risk-and-value-at-scale' },
      { label: 'The New Stack — "MCP\'s biggest growing pains for production use"', url: 'https://thenewstack.io/model-context-protocol-roadmap-2026/' },
    ],
  },
  {
    title: 'IA en manufactura',
    sources: [
      { label: 'Redwood Software — "Manufacturing AI and Automation Outlook 2026"', url: 'https://www.prnewswire.com/news-releases/perspectiva-de-ia-y-automatizacion-en-la-fabricacion-para-el-ano-2026-302665481.html' },
      { label: 'IDC — "Charting the AI-driven future of manufacturing"', url: 'https://www.idc.com/resource-center/blog/charting-the-ai-driven-future-of-manufacturing/' },
      { label: 'RT Insights — "Smart Manufacturing Trends 2026"', url: 'https://www.rtinsights.com/smart-manufacturing-trends-2026-how-ai-iot-and-automation-are-driving-efficiency-and-resilience/' },
      { label: 'Phantasma Global — "AI and Automation in Manufacturing 2026"', url: 'https://www.phantasma.global/blogs/ai-and-automation-use-cases-in-manufacturing' },
      { label: 'BizTech Magazine — "Tech Trends 2026: AI, Data and Security in Manufacturing"', url: 'https://biztechmagazine.com/article/2025/12/tech-trends-2026-how-ai-data-and-security-are-reshaping-manufacturing' },
      { label: 'Standard Bots — "AI in manufacturing: Benefits and use cases [2026]"', url: 'https://standardbots.com/blog/ai-manufacturing' },
      { label: 'iFactory — "Future of Smart Manufacturing: AI Trends 2026"', url: 'https://ifactoryapp.com/article/future-of-smart-manufacturing-ai-trends-industrial-transformation-2026' },
      { label: 'NVIDIA Blog — "AI-Driven Manufacturing at Hannover Messe 2026"', url: 'https://blogs.nvidia.com/blog/ai-manufacturing-hannover-messe/' },
      { label: 'CustomerTimes — "AI Automation in Manufacturing 2025 – Market Report"', url: 'https://www.customertimes.com/ai-automation-in-manufacturing-2025-report' },
      { label: 'Manufacturing Dive — "The physical AI craze and automation trends 2026"', url: 'https://www.manufacturingdive.com/news/physical-ai-craze-2026-automation-trends-to-watch/810860/' },
    ],
  },
  {
    title: 'IA en México',
    sources: [
      { label: 'La Jornada — "México frente a la IA: entre el empuje externo y el rezago"', url: 'https://www.jornada.com.mx/2026/04/26/economia/013n1eco' },
      { label: 'Vanguardia Industrial — "México avanza en IA industrial, pero persisten brechas"', url: 'https://vanguardia-industrial.net/mexico-avanza-en-ia-industrial-pero-persisten-brechas/' },
      { label: 'IAmanos — "IA en Manufactura en México: Industria 4.0 en 2026"', url: 'https://iamanos.com/blog/ia-manufactura-industria-mexico-industria-4-0-2026' },
      { label: 'Cluster Industrial — "Manufactura avanzada en México 2026"', url: 'https://clusterindustrial.com.mx/manufactura-avanzada-en-mexico-2026-las-tendencias-que-estan-redefiniendo-la-industria/' },
      { label: 'Konfia.ai — "Panorama de la IA en México hacia 2025 y 2026"', url: 'https://konfia.ai/panorama-de-la-inteligencia-artificial-en-mexico-hacia-2025-y-2026/' },
      { label: 'Mexico Industry — "¿Qué está pasando con la IA en México?"', url: 'https://mexicoindustry.com/noticia/que-esta-pasando-con-la-inteligencia-artificial-en-mexico-y-el-mundo-empresarial' },
      { label: 'American Industrial Magazine — "IA Industrial en México 2026"', url: 'https://www.americanindustrialmagazine.com/blogs/metalmecanica/inteligencia-artificial-industrial-en-mexico-2026-casos-reales-datos-oficiales-y-ventajas-para-la-manufactura' },
      { label: 'Agente Digitalizado — "IA en PyMEs Mexicanas 2026"', url: 'https://agentedigitalizado.com/ia-pymes-mexicanas-adopcion-2026/' },
    ],
  },
  {
    title: 'Vibe coding y herramientas de desarrollo con IA',
    sources: [
      { label: 'Roadmap.sh — "The 10 Best Vibe Coding Tools in 2026"', url: 'https://roadmap.sh/vibe-coding/best-tools' },
      { label: 'Daily.dev — "Vibe Coding in 2026: How AI Is Changing Developers"', url: 'https://daily.dev/blog/vibe-coding-how-ai-changing-developers-code' },
      { label: 'GeekWire — "Claude Code has Seattle engineers buzzing"', url: 'https://www.geekwire.com/2026/a-new-era-of-software-development-claude-code-has-seattle-engineers-buzzing-as-ai-coding-hits-new-phase/' },
      { label: 'Axios — "Anthropic\'s Claude Code transforms vibe coding"', url: 'https://www.axios.com/2026/01/07/anthropics-claude-code-vibe-coding' },
      { label: 'Scientific American — "How Claude Code is bringing vibe coding to everyone"', url: 'https://www.scientificamerican.com/article/how-claude-code-is-bringing-vibe-coding-to-everyone/' },
      { label: 'Axios — "Anthropic\'s Claude Cowork wrote itself"', url: 'https://www.axios.com/2026/01/13/anthropic-claude-code-cowork-vibe-coding' },
      { label: 'MindStudio — "Codex vs Claude Code 2026"', url: 'https://www.mindstudio.ai/blog/codex-vs-claude-code-2026' },
    ],
  },
];

/* Minimal particle background for closing */
function ClosingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      color: ['#00d4ff', '#a855f7', '#ec4899'][Math.floor(Math.random() * 3)],
      opacity: Math.random() * 0.3 + 0.1,
    }));

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}

/* Sources modal overlay */
function SourcesModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(5, 5, 10, 0.92)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.5rem, 2vw, 2rem)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '85vh',
          overflowY: 'auto',
          background: 'linear-gradient(145deg, rgba(15, 15, 25, 0.98), rgba(10, 10, 18, 0.98))',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          borderRadius: '16px',
          padding: 'clamp(1rem, 3vw, 2rem)',
          boxShadow: '0 0 60px rgba(0, 212, 255, 0.08), 0 0 120px rgba(168, 85, 247, 0.05)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}>
            📚 Fuentes y Referencias
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              padding: '0.3rem 0.7rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
          >
            ✕
          </button>
        </div>

        {/* Categories */}
        {SOURCES.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 'clamp(0.8rem, 2vw, 1.5rem)' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.75rem, 1.8vw, 1.05rem)',
              fontWeight: 600,
              color: 'var(--neon-cyan)',
              marginBottom: '0.5rem',
              paddingBottom: '0.35rem',
              borderBottom: '1px solid rgba(0, 212, 255, 0.15)',
            }}>
              {cat.title}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {cat.sources.map((src, si) => (
                <li key={si}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.55rem, 1.2vw, 0.78rem)',
                      color: 'rgba(255,255,255,0.75)',
                      textDecoration: 'none',
                      display: 'block',
                      padding: '0.35rem 0.5rem',
                      borderRadius: '6px',
                      transition: 'all 0.2s',
                      lineHeight: 1.4,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 212, 255, 0.08)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                    }}
                  >
                    <span style={{ color: 'var(--neon-purple)', marginRight: '0.4rem' }}>→</span>
                    {src.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Footer note */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.5rem, 1vw, 0.7rem)',
          color: 'rgba(255,255,255,0.35)',
          textAlign: 'center',
          marginTop: '0.5rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          {SOURCES.reduce((acc, c) => acc + c.sources.length, 0)} fuentes consultadas · Abril 2026
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Shared button style helper */
const btnBase: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
  fontWeight: 600,
  color: '#ffffff',
  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(168, 85, 247, 0.15))',
  border: '1px solid rgba(0, 212, 255, 0.3)',
  borderRadius: '12px',
  padding: 'clamp(0.45rem, 1vw, 0.65rem) clamp(1rem, 2.5vw, 1.6rem)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)',
  textDecoration: 'none',
};

function hoverIn(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.25), rgba(168, 85, 247, 0.25))';
  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
  e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.2)';
  e.currentTarget.style.transform = 'translateY(-2px)';
}
function hoverOut(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(168, 85, 247, 0.15))';
  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.1)';
  e.currentTarget.style.transform = 'translateY(0)';
}

export default function Slide21Closing(): ReactNode {
  const [showSources, setShowSources] = useState(false);

  const handleGoToStart = () => {
    window.location.hash = 'slide-1';
    window.location.reload();
  };

  return (
    <div className="slide">
      <ClosingParticles />

      <div className="slide-inner" style={{ zIndex: 1, gap: 'clamp(0.8rem, 2.5vw, 1.5rem)', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 10vw, 8rem)',
            fontWeight: 700,
            lineHeight: 1,
            background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            margin: 0,
          }}
        >
          ¡Gracias!
        </motion.h1>

        {/* Q&A Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            margin: 0,
            marginTop: '-0.5rem',
            letterSpacing: '0.02em',
          }}
        >
          ¿Preguntas?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="neon-line"
        />

        {/* QR Code section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(0.4rem, 1.2vw, 0.8rem)',
          }}
        >
          <div style={{
            position: 'relative',
            padding: 'clamp(0.5rem, 1.5vw, 1rem)',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.1), 0 0 80px rgba(168, 85, 247, 0.05)',
          }}>
            <img
              src={QR_API_URL}
              alt="QR code para acceder a esta presentación"
              width={500}
              height={500}
              style={{
                display: 'block',
                width: 'clamp(280px, 50vw, 500px)',
                height: 'clamp(280px, 50vw, 500px)',
                imageRendering: 'pixelated',
                borderRadius: '8px',
              }}
            />
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.5rem, 1.1vw, 0.8rem)',
            color: 'var(--neon-cyan)',
            textAlign: 'center',
            opacity: 0.8,
            letterSpacing: '0.02em',
          }}>
            Escanea para ver esta presentación
          </div>
        </motion.div>

        {/* Action buttons row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(0.5rem, 1.5vw, 0.8rem)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Back to start */}
          <button onClick={handleGoToStart} style={btnBase} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            <span style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1.1rem)' }}>←</span>
            Volver al inicio
          </button>

          {/* GitHub source */}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={btnBase} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Código fuente
          </a>

          {/* Sources button */}
          <button onClick={() => setShowSources(true)} style={btnBase} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            <span style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1.1rem)' }}>📚</span>
            Bibliografía
          </button>
        </motion.div>
      </div>

      {/* Sources modal */}
      <AnimatePresence>
        {showSources && <SourcesModal onClose={() => setShowSources(false)} />}
      </AnimatePresence>
    </div>
  );
}
