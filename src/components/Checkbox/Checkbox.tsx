import clsx from 'clsx'
import React, { forwardRef } from 'react'

import styles from './Checkbox.module.scss'

declare const CheckboxSizes: ['small', 'default', 'large']
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  ref?: any
}

const Checkbox: React.FC<CheckboxProps> = forwardRef<any, CheckboxProps>(
  ({ children, className, disabled, ...props }, ref) => {
    const disabledClx = disabled && 'checkbox-disabled'

    return (
      <label className={clsx([styles.checkboxContainer, disabledClx, className])}>
        {children}
        <input type="checkbox" ref={ref} className={styles.checkbox} {...props} disabled={disabled} />
        <span className={styles.checkmark}></span>
      </label>
    )
  },
)

export default Checkbox
