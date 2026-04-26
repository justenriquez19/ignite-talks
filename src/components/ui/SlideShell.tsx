import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { KEYBOARD_SHORTCUTS } from '../../lib/data';

interface SlideShellProps {
  slides: ReactNode[];
  talkSlug: string;
  totalSlides: number;
}

export default function SlideShell({ slides, talkSlug, totalSlides }: SlideShellProps): ReactNode {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Read initial slide from URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const match = hash.match(/slide-(\d+)/);
      if (match) {
        const slideIndex = parseInt(match[1], 10) - 1;
        if (slideIndex >= 0 && slideIndex < totalSlides) {
          setCurrentSlide(slideIndex);
        }
      }
    }
  }, [totalSlides]);

  // Update URL hash and progress bar
  useEffect(() => {
    const slideNum = currentSlide + 1;
    window.location.hash = `slide-${slideNum}`;

    // Update slide counter
    const currentEl = document.getElementById('slide-current');
    const progressEl = document.getElementById('progress-bar-fill');

    if (currentEl) {
      currentEl.textContent = String(slideNum).padStart(2, '0');
    }

    if (progressEl) {
      const progress = (slideNum / totalSlides) * 100;
      progressEl.style.width = `${progress}%`;
    }
  }, [currentSlide, totalSlides]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setDirection(index > currentSlide ? 'next' : 'prev');
      setCurrentSlide(index);
    }
  }, [currentSlide, totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection('next');
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection('prev');
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (KEYBOARD_SHORTCUTS.next.includes(e.key as typeof KEYBOARD_SHORTCUTS.next[number])) {
        e.preventDefault();
        nextSlide();
      } else if (KEYBOARD_SHORTCUTS.prev.includes(e.key as typeof KEYBOARD_SHORTCUTS.prev[number])) {
        e.preventDefault();
        prevSlide();
      } else if (KEYBOARD_SHORTCUTS.home.includes(e.key as typeof KEYBOARD_SHORTCUTS.home[number])) {
        e.preventDefault();
        goToSlide(0);
      } else if (KEYBOARD_SHORTCUTS.end.includes(e.key as typeof KEYBOARD_SHORTCUTS.end[number])) {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      } else if (KEYBOARD_SHORTCUTS.exit.includes(e.key as typeof KEYBOARD_SHORTCUTS.exit[number])) {
        window.location.href = '/';
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, totalSlides]);

  // Touch/swipe navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    function handleTouchStart(e: TouchEvent): void {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }

    function handleTouchEnd(e: TouchEvent): void {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Only trigger if horizontal swipe is dominant
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  return (
    <div
      className="slide-shell"
      role="region"
      aria-label={`Presentación: ${talkSlug}`}
      aria-roledescription="slide deck"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} de ${totalSlides}`}
          aria-hidden={index !== currentSlide}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: index === currentSlide ? 1 : 0,
            transform: index === currentSlide
              ? 'translateX(0)'
              : index < currentSlide
                ? 'translateX(-30px)'
                : 'translateX(30px)',
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
            pointerEvents: index === currentSlide ? 'auto' : 'none',
            visibility: index === currentSlide ? 'visible' : 'hidden',
          }}
        >
          {slide}
        </div>
      ))}
    </div>
  );
}
