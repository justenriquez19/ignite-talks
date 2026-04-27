import { useState, useEffect, useCallback, useRef, cloneElement, isValidElement, type ReactNode, type ReactElement } from 'react';
import { KEYBOARD_SHORTCUTS } from '../../lib/data';

interface SlideShellProps {
  slides: ReactNode[];
  talkSlug: string;
  totalSlides: number;
  /**
   * Map of slide index → number of extra sub-steps before advancing.
   * E.g. { 2: 2 } means slide index 2 has 2 sub-steps:
   *   - Enter slide → subStep=0
   *   - First tick  → subStep=1
   *   - Second tick → advance to next slide
   */
  subStepsMap?: Record<number, number>;
}

export default function SlideShell({ slides, talkSlug, totalSlides, subStepsMap = {} }: SlideShellProps): ReactNode {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  /**
   * Mount keys: each slide gets a counter that increments every time
   * the slide becomes active. By using this as the React `key` for
   * the slide wrapper, React fully unmounts/remounts the slide
   * component, resetting all internal state and re-triggering all
   * useEffect hooks and Framer Motion initial→animate transitions.
   */
  const [mountKeys, setMountKeys] = useState<number[]>(() =>
    Array.from({ length: totalSlides }, (_, i) => (i === 0 ? 1 : 0))
  );
  const prevSlideRef = useRef(0);

  /** How many sub-steps does a given slide have? Default = 0 (no sub-steps). */
  const getMaxSubSteps = useCallback((slideIndex: number) => {
    return subStepsMap[slideIndex] ?? 0;
  }, [subStepsMap]);

  // Read initial slide from URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const match = hash.match(/slide-(\d+)/);
      if (match) {
        const slideIndex = parseInt(match[1], 10) - 1;
        if (slideIndex >= 0 && slideIndex < totalSlides) {
          setCurrentSlide(slideIndex);
          setSubStep(0);
          // Mark this slide as needing a mount
          setMountKeys(prev => {
            const next = [...prev];
            next[slideIndex] = (next[slideIndex] || 0) + 1;
            return next;
          });
          prevSlideRef.current = slideIndex;
        }
      }
    }
  }, [totalSlides]);

  // Increment mount key when navigating to a new slide
  useEffect(() => {
    if (currentSlide !== prevSlideRef.current) {
      setMountKeys(prev => {
        const next = [...prev];
        next[currentSlide] = (next[currentSlide] || 0) + 1;
        return next;
      });
      prevSlideRef.current = currentSlide;
    }
  }, [currentSlide]);

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
      setSubStep(0);
    }
  }, [currentSlide, totalSlides]);

  const nextSlide = useCallback(() => {
    const maxSub = getMaxSubSteps(currentSlide);
    if (subStep < maxSub) {
      // Still have sub-steps to reveal
      setSubStep((prev) => prev + 1);
    } else if (currentSlide < totalSlides - 1) {
      // All sub-steps consumed, advance to next slide
      setDirection('next');
      setCurrentSlide((prev) => prev + 1);
      setSubStep(0);
    }
  }, [currentSlide, totalSlides, subStep, getMaxSubSteps]);

  const prevSlide = useCallback(() => {
    if (subStep > 0) {
      // Go back within sub-steps
      setSubStep((prev) => prev - 1);
    } else if (currentSlide > 0) {
      setDirection('prev');
      const prevIndex = currentSlide - 1;
      setCurrentSlide(prevIndex);
      // When going back, show the slide fully revealed
      setSubStep(getMaxSubSteps(prevIndex));
    }
  }, [currentSlide, subStep, getMaxSubSteps]);

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
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;

        // Only mount the current slide — all others are unmounted.
        // This guarantees that on every navigation, the slide component
        // fully remounts: useState resets, useEffect re-runs, and
        // Framer Motion initial→animate transitions replay.
        if (!isActive) {
          return (
            <div
              key={`shell-${index}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} de ${totalSlides}`}
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                pointerEvents: 'none',
                visibility: 'hidden',
              }}
            />
          );
        }

        // Inject subStep prop into slides that accept it
        const renderedSlide = isValidElement(slide) && index in subStepsMap
          ? cloneElement(slide as ReactElement<{ subStep?: number }>, { subStep })
          : slide;

        return (
          <div
            key={`slide-${index}-${mountKeys[index]}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} de ${totalSlides}`}
            aria-hidden={false}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 1,
              transform: 'translateX(0)',
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
              pointerEvents: 'auto',
              visibility: 'visible',
            }}
          >
            {renderedSlide}
          </div>
        );
      })}
    </div>
  );
}
