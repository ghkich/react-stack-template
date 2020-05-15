import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useState } from 'react'

import ClickAwayListener from '../ClickAwayListener/ClickAwayListener'
import Portal from '../Portal/Portal'
import styles from './Dropdown.module.scss'

interface DropDownProps {
  trigger?: ('click' | 'hover' | 'contextMenu')[]
  overlay: React.ReactNode
  onVisibleChange?: (visible: boolean) => void
  visible?: boolean
  disabled?: boolean
  className?: string
}

const Dropdown: React.FC<DropDownProps> = ({ overlay, children }) => {
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
  })
  const buttonTrigger = useCallback((node) => {
    if (node !== null) {
      const rect = node.getBoundingClientRect()
      setCoords({
        left: rect.x,
        top: rect.y + window.scrollY + rect.height + 5,
      })
    }
  }, [])
  const [overlayVisible, setOverlayVisible] = useState(false)

  function handleOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setOverlayVisible(!overlayVisible)
  }

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          setOverlayVisible(false)
        }}
      >
        <div ref={buttonTrigger} role="button" onClick={handleOnClick} style={{ cursor: 'pointer', color: '#527edd' }}>
          {children}
        </div>
      </ClickAwayListener>
      <AnimatePresence initial={false}>
        {overlayVisible && (
          <Portal>
            <div className={styles.overlayContainer} style={{ top: coords.top, left: coords.left }}>
              <motion.div
                key="dropdown"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{ collapsed: { opacity: 0, scale: 0.8 }, open: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: 'top right' }}
              >
                {overlay}
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
}

export default Dropdown
