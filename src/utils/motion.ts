import type { Transition, Variants } from 'framer-motion';

export const motionDurations = {
  instant: 0.12,
  fast: 0.18,
  base: 0.24,
  slow: 0.36,
  slower: 0.5,
} as const;

export const motionEase = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
  spring: [0.34, 1.2, 0.64, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: motionDurations.base, ease: motionEase.out } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: motionDurations.base, ease: motionEase.out } },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: motionDurations.base, ease: motionEase.out } },
};

export const slideIn: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: motionDurations.base, ease: motionEase.out } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: motionDurations.base, ease: motionEase.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: motionDurations.fast, ease: motionEase.out } },
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionDurations.slow, ease: motionEase.bounce },
  },
};

export const pageTransition: Transition = {
  duration: motionDurations.base,
  ease: motionEase.out,
};

export const cardHover = {
  rest: { y: 0, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.15)' },
  hover: {
    y: -3,
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.25), 0 4px 6px -4px rgb(0 0 0 / 0.15)',
    transition: { duration: motionDurations.fast, ease: motionEase.out },
  },
};

export const progressFill: Variants = {
  hidden: { width: 0 },
  visible: {
    width: 'var(--progress-width, 100%)',
    transition: { duration: 0.8, ease: motionEase.out, delay: 0.2 },
  },
};

export const successReveal: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: motionDurations.fast } },
};

export const errorReveal: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: motionDurations.fast } },
};

export const unlockAnimation: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: 'brightness(0.8)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'brightness(1)',
    transition: { duration: motionDurations.slow, ease: motionEase.spring },
  },
};

export const modalEnter: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: motionDurations.base } },
};

export const panelExpand: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: 'auto', opacity: 1, transition: { duration: motionDurations.base } },
};

export const codeTyping: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionDurations.slower,
      ease: motionEase.out,
    },
  },
};

export const resultSlideIn: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: motionDurations.base, ease: motionEase.spring },
  },
};

export const optionSelect: Variants = {
  idle: { scale: 1 },
  selected: {
    scale: 1.02,
    transition: { duration: motionDurations.fast, ease: motionEase.spring },
  },
};

export const xpGain: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: motionDurations.slow, ease: motionEase.bounce },
  },
};

export function staggerChildren(stagger = 0.06): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
}

export function staggerList(itemCount: number): Variants {
  return staggerChildren(Math.min(0.1, 0.6 / itemCount));
}
