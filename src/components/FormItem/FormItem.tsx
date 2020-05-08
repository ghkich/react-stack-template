import clsx from 'clsx'
import { motion } from 'framer-motion'
import React from 'react'

import { enteringFromOpacity } from '../../utils/animation-utils'
import styles from './FormItem.module.scss'

type ValidateStatuses = 'success' | 'warning' | 'error'
interface FormItemProps {
  className?: string
  id?: string
  htmlFor?: string
  label?: React.ReactNode
  feedbackStatus?: ValidateStatuses
  feedback?: string
  required?: boolean
  style?: React.CSSProperties
}

const FormItem: React.FC<FormItemProps> = ({
  label,
  feedback,
  feedbackStatus = 'error',
  className,
  htmlFor,
  children,
  ...props
}) => {
  const statusClx = feedback && feedbackStatus && `form-item-status-${feedbackStatus}`
  return (
    <div className={clsx([styles.formItemContainer, statusClx, className])} {...props}>
      {label && (
        <label htmlFor={htmlFor} className={styles.formItemLabel}>
          {label}
        </label>
      )}
      {children}
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
