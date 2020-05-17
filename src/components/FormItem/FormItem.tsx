import clsx from 'clsx'
import {motion} from 'framer-motion'
import React from 'react'

import {enteringFromOpacity} from '../../utils/animation-utils'
import styles from './FormItem.module.scss'

type ValidateStatuses = 'success' | 'warning' | 'error'
interface FormItemProps {
  className?: string
  id?: string
  htmlFor?: string
  label?: React.ReactNode
  feedbackStatus?: ValidateStatuses
  feedback?: string
  flex?: boolean
  required?: boolean
  style?: React.CSSProperties
}

const FormItem: React.FC<FormItemProps> = ({
  label,
  feedback,
  feedbackStatus = 'error',
  flex,
  className,
  htmlFor,
  children,
  ...props
}) => {
  const statusClx = feedback && feedbackStatus && `form-item-status-${feedbackStatus}`
  const flexClx = flex && 'form-flex'
  return (
    <div className={clsx([styles.formItemContainer, statusClx, className])} {...props}>
      {label && (
        <label htmlFor={htmlFor} className={clsx([styles.formItemLabel, flexClx])}>
          {label}
        </label>
      )}
      <div className={clsx([styles.childrenContainer, flexClx])}>{children}</div>
      <motion.div
        className={styles.formItemFeedback}
        initial={feedback ? 'enter' : 'exit'}
        animate={feedback ? 'enter' : 'exit'}
        variants={enteringFromOpacity}
      >
        {feedback}
      </motion.div>
    </div>
  )
}

export default FormItem
