import { useEffect, useRef, type ReactNode } from 'react';

interface FireGlowProps {
  /** Size of the glow in pixels */
  size?: number;
  /** Intensity: 'subtle' | 'medium' | 'strong' */
  intensity?: 'subtle' | 'medium' | 'strong';
  /** Whether to animate the glow */
  animate?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const intensityMap = {
  subtle: {
    innerOpacity: 0.1,
    outerOpacity: 0.05,
  },
  medium: {
    innerOpacity: 0.2,
    outerOpacity: 0.1,
  },
  strong: {
    innerOpacity: 0.3,
    outerOpacity: 0.15,
  },
};

export default function FireGlow({
  size = 400,
  intensity = 'medium',
  animate = true,
  className = '',
}: FireGlowProps): ReactNode {
  const glowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  const config = intensityMap[intensity];
  const shouldAnimate = animate && !prefersReducedMotion.current;

  return (
    <div
      ref={glowRef}
      className={`fire-glow ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: `radial-gradient(
          circle,
          rgba(230, 54, 32, ${config.innerOpacity}) 0%,
          rgba(230, 54, 32, ${config.outerOpacity}) 40%,
          transparent 70%
        )`,
        filter: 'blur(60px)',
        pointerEvents: 'none',
        animation: shouldAnimate ? 'glow-pulse 4s ease-in-out infinite' : 'none',
      }}
    />
  );
}
