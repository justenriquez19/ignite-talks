import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';

/* ─── Neural Network Particle Canvas ─── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const isDesktop = window.innerWidth >= 768;
    const PARTICLE_COUNT = isDesktop ? 400 : 80;
    const CONNECTION_DIST = isDesktop ? 160 : 150;
    const MOUSE_RADIUS = 200;
    const COHESION_RADIUS = isDesktop ? 250 : 180;
    const LONELY_THRESHOLD = 3; // fewer than this = lonely
    const COHESION_FORCE = 0.015;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener('mousemove', handleMouseMove);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update & draw particles
      for (let pi = 0; pi < particles.length; pi++) {
        const p = particles[pi];

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        // Cohesion: lonely particles drift toward nearby group centroid
        let cx = 0, cy = 0, neighborCount = 0;
        for (let ni = 0; ni < particles.length; ni++) {
          if (ni === pi) continue;
          const ndx = particles[ni].x - p.x;
          const ndy = particles[ni].y - p.y;
          const nd = ndx * ndx + ndy * ndy;
          if (nd < COHESION_RADIUS * COHESION_RADIUS) {
            cx += particles[ni].x;
            cy += particles[ni].y;
            neighborCount++;
          }
        }
        if (neighborCount > 0 && neighborCount < LONELY_THRESHOLD) {
          cx /= neighborCount;
          cy /= neighborCount;
          p.vx += (cx - p.x) * COHESION_FORCE;
          p.vy += (cy - p.y) * COHESION_FORCE;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const baseOpacity = isDesktop ? 0.2 : 0.15;
            const opacity = (1 - dist / CONNECTION_DIST) * baseOpacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = isDesktop ? 0.7 : 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasRef]);
}

/* ─── Countdown Timer ─── */
function CountdownTimer() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
      color: 'rgba(180, 200, 220, 0.85)',
      letterSpacing: '0.1em',
      textShadow: '0 0 8px rgba(0, 212, 255, 0.3)',
    }}>
      {hours}:{minutes}:{seconds}
    </div>
  );
}

/* ─── Slide 01: Title ─── */
export default function Slide01Title(): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);

  return (
    <div className="slide" style={{ cursor: 'crosshair' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      />

      <div className="slide-inner" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="slide-label"
          style={{
            color: 'rgba(220, 225, 240, 0.95)',
            textShadow: '0 0 12px rgba(0, 212, 255, 0.25)',
          }}
        >
          Conferencia Magistral — CBTIS 214 × CANACO Chetumal
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="slide-title"
          style={{
            background: 'linear-gradient(135deg, #f0ece6 0%, #00d4ff 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          El uso de la IA en procesos productivos
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'var(--color-ignite-text-primary)', fontWeight: 600 }}>
            Justo Enríquez
          </span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--neon-cyan)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.875rem, 1.4vw, 1.125rem)', color: 'rgba(200, 210, 230, 0.9)', textShadow: '0 0 10px rgba(168, 85, 247, 0.2)' }}>
            Mayo 2026
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          style={{ marginTop: '1rem' }}
        >
          <div className="neon-line" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          style={{ marginTop: '0.5rem' }}
        >
          <CountdownTimer />
        </motion.div>
      </div>
    </div>
  );
}
