import clsx from 'clsx'
import React, { useState } from 'react'

import styles from './ToggleButton.module.scss'

export interface ToggleButtonProps {
  startActive?: boolean
  onToggleActive?: (active: boolean) => void
  style?: React.CSSProperties
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ startActive, onToggleActive, children, style }) => {
  const [activeState, setActiveState] = useState(startActive)
  const activeClx = activeState && `toggle-status-active`

  function handleToggleActive() {
    onToggleActive && onToggleActive(!activeState)
    setActiveState(!activeState)
  }

  return (
    <button
      type="button"
      className={clsx([styles.toggleButtonContainer, activeClx])}
      onClick={handleToggleActive}
      onMouseDown={(e) => e.preventDefault()}
      style={style}
    >
      {children}
    </button>
  )
}

export default ToggleButton
