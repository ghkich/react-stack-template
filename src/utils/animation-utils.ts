export const springTransition = { type: 'spring', stiffness: 300, damping: 50 }

const enteringFromLeft = {
  enter: { x: 0, opacity: 1, transition: springTransition },
  exit: { x: -50, opacity: 0, transition: springTransition },
}

const enteringFromRight = {
  enter: { x: 0, opacity: 1, transition: springTransition },
  exit: { x: 50, opacity: 0, transition: springTransition },
}

const enteringFromTop = {
  enter: { y: 0, opacity: 1, transition: springTransition },
  exit: { y: -50, opacity: 0, transition: springTransition },
}

const enteringFromBottom = {
  enter: { y: 0, opacity: 1, transition: springTransition },
  exit: { y: 50, opacity: 0, transition: springTransition },
}

const enteringFromOpacity = {
  enter: { opacity: 1, transition: springTransition },
  exit: { opacity: 0, transition: springTransition },
}

const enteringFromZoom = {
  enter: { scale: 1, transition: { ...springTransition, delayChildren: 0.1 } },
  exit: { scale: 0, transition: springTransition },
}

const menuEntering = {
  enter: { zIndex: 10, opacity: 1, transition: { ...springTransition, staggerChildren: 0.1, delayChildren: 0.2 } },
  exit: { zIndex: -1, opacity: 0, transition: springTransition },
}

const openCollapsed = {
  enter: { opacity: 1, height: 'auto', transition: { ...springTransition, delayChildren: 0.15 } },
  exit: { opacity: 0, height: 0, transition: springTransition },
}

export {
  enteringFromLeft,
  enteringFromRight,
  enteringFromTop,
  enteringFromBottom,
  enteringFromOpacity,
  enteringFromZoom,
  menuEntering,
  openCollapsed,
}
