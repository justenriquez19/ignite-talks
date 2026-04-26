// ============================================
// IGNITE-TALKS — Shared Data & Constants
// ============================================

/** Site-wide configuration */
export const SITE_CONFIG = {
  name: 'IGNITE TALKS',
  author: 'Justo Enríquez',
  location: 'Chetumal, Quintana Roo',
  country: 'México',
  url: 'https://ignite.justo.dev',
  github: 'https://github.com/justenriquez19',
} as const;

/** Social links */
export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    url: 'https://github.com/justenriquez19',
    icon: 'github',
  },
] as const;

/** Slide component interface — shared by all talk slides */
export interface SlideProps {
  /** Whether this slide is currently visible */
  isActive: boolean;
  /** Slide number (1-indexed) for internal reference */
  slideNumber: number;
}

/** Navigation direction for slide transitions */
export type SlideDirection = 'next' | 'prev';

/** Keyboard shortcuts */
export const KEYBOARD_SHORTCUTS = {
  next: ['ArrowRight', 'ArrowDown', ' ', 'PageDown'],
  prev: ['ArrowLeft', 'ArrowUp', 'PageUp'],
  home: ['Home'],
  end: ['End'],
  exit: ['Escape'],
} as const;

/** Breakpoints (match CSS) */
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
} as const;

/** Animation durations in ms (match CSS vars) */
export const DURATIONS = {
  fast: 150,
  default: 300,
  slow: 500,
} as const;
