import clsx from 'clsx'
import React, { forwardRef } from 'react'

import styles from './Input.module.scss'

declare const InputSizes: ['small', 'default', 'large']
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  ref?: any
  size?: typeof InputSizes[number]
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
  allowClear?: boolean
}

const Input: React.FC<InputProps> = forwardRef<any, InputProps>(({ size, className, ...props }, ref) => {
  const sizeClx = size && `input-${size}`

  return <input ref={ref} className={clsx([styles.inputContainer, sizeClx, className])} {...props} />
})

export default Input
