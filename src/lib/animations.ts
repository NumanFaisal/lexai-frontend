// Animation presets for LexAI — easeOut curves only, no spring/bounce
// All durations intentionally restrained for a serious legal product

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2, ease: 'easeOut' as const },
};

export const modalTransition = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.15, ease: 'easeOut' as const },
};

export const listItemStagger = {
  container: {
    animate: {
      transition: { staggerChildren: 0.03 },
    },
  },
  item: {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: { duration: 0.15, ease: 'easeOut' as const },
  },
};

export const sidebarTransition = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
  transition: { duration: 0.25, ease: 'easeOut' as const },
};

export const backdropTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: 'easeOut' as const },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, ease: 'easeOut' as const },
};

export const tabIndicator = {
  layoutId: 'tab-indicator',
  transition: { duration: 0.15, ease: 'easeOut' as const },
};

