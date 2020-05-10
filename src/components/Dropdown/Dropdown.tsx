import React, { useState } from 'react'

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
  const [overlayVisible, setOverlayVisible] = useState(false)

  function handleOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const node = e.target as HTMLElement
    const rect = node.getBoundingClientRect()
    setCoords({
      left: rect.x - 105,
      top: rect.y + window.scrollY + rect.height + 5,
    })
    setOverlayVisible(!overlayVisible)
  }

  return (
    <>
      <ClickAwayListener onClickAway={() => setOverlayVisible(false)}>
        <div role="button" onClick={handleOnClick} style={{ cursor: 'pointer', color: '#527edd' }}>
          {children}
        </div>
        {overlayVisible && (
          <Portal>
            <div className={styles.overlayContainer} style={{ top: coords.top, left: coords.left }}>
              {overlay}
            </div>
          </Portal>
        )}
      </ClickAwayListener>
    </>
  )
}

export default Dropdown
