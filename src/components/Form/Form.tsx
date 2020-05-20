import clsx from 'clsx'
import React, {HTMLAttributes} from 'react'

import styles from './Form.module.scss'

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  className?: string
  orientation?: 'vertical' | 'horizontal'
  style?: React.CSSProperties
}

const Form: React.FC<FormProps> = ({className, orientation = 'vertical', children, ...props}) => {
  const orientationClx = `form-${orientation}`
  return (
    <form className={clsx([styles.formContainer, orientationClx, className])} {...props}>
      {children}
    </form>
  )
}

export default Form
