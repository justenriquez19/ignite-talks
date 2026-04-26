import type { ReactNode } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps): ReactNode {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Slide ${current} de ${total}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        backgroundColor: 'var(--color-ignite-surface)',
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--color-ignite-fire), var(--color-ignite-ember))',
          transition: 'width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}
