import clsx from 'clsx'
import React, {useState} from 'react'

import styles from './ToggleButton.module.scss'

export interface ToggleButtonProps {
  active?: boolean
  onToggleActive?: (active: boolean) => void
  style?: React.CSSProperties
}

const ToggleButton: React.FC<ToggleButtonProps> = ({active, onToggleActive, children, style}) => {
  const [activeState, setActiveState] = useState(active)
  const activeClx = activeState && `toggle-status-active`

  function handleToggleActive() {
    if (onToggleActive) {
      onToggleActive(!activeState)
      setActiveState(!activeState)
    }
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
