import clsx from 'clsx'
import React, { forwardRef } from 'react'
import InputMask from 'react-input-mask'

import styles from './Input.module.scss'

declare const InputSizes: ['small', 'default', 'large']
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  ref?: any
  mask?: string
  size?: typeof InputSizes[number]
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
  allowClear?: boolean
}

const Input: React.FC<InputProps> = forwardRef<any, InputProps>(
  ({ mask, size, className, onPressEnter, ...props }, ref) => {
    const sizeClx = size && `input-size-${size}`
    const inputProps = {
      className: clsx([styles.inputContainer, sizeClx, className]),
      onKeyDown: handleKeyDown,
      ...props,
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter' && onPressEnter) {
        onPressEnter(e)
      }
    }

    if (mask) {
      return <InputMask mask={mask} {...inputProps} />
    }

    return <input ref={ref} {...inputProps} />
  },
)

export default Input
