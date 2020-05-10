import React, { useEffect, useRef } from 'react'

interface ClickAwayListenerProps {
  onClickAway: () => void
}

const ClickAwayListener: React.FC<ClickAwayListenerProps> = ({ onClickAway, children }) => {
  const wrapperRef = useRef<any>(null)

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onClickAway()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperRef])

  return <div ref={wrapperRef}>{children}</div>
}

export default ClickAwayListener
