import clsx from 'clsx'
import React, { forwardRef } from 'react'

import styles from './Input.module.scss'

declare const InputSizes: ['small', 'default', 'large']
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  ref?: any
  size?: typeof InputSizes[number]
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
  allowClear?: boolean
}

const Input: React.FC<InputProps> = forwardRef<any, InputProps>(({ size, className, onPressEnter, ...props }, ref) => {
  const sizeClx = size && `input-size-${size}`

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && onPressEnter) {
      onPressEnter(e)
    }
  }

  return (
    <input
      ref={ref}
      className={clsx([styles.inputContainer, sizeClx, className])}
      onKeyDown={handleKeyDown}
      {...props}
    />
  )
})

export default Input
