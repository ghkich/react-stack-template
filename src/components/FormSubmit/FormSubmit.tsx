import clsx from 'clsx'
import { motion } from 'framer-motion'
import React, { HTMLAttributes, useEffect, useRef } from 'react'

import { enteringFromTop } from '../../utils/animation-utils'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import styles from './FormSubmit.module.scss'
import { getPropsByStatus } from './getPropsByStatus'

export type FormSubmitStatus = 'loading' | 'success' | 'error' | 'idle'

interface FormSubmitProps extends HTMLAttributes<HTMLElement> {
  status: FormSubmitStatus
  loadingMessage?: string
  successMessage?: string
  delayResponse?: number
  onSuccess?: () => void
  onError?: () => void
  tabIndex?: number
  disabled?: boolean
}

const FormSubmit: React.FC<FormSubmitProps> = ({
  status,
  loadingMessage,
  successMessage,
  delayResponse = 0,
  onSuccess,
  onError,
  tabIndex,
  disabled,
  children,
  ...props
}) => {
  const { buttonType, iconType } = getPropsByStatus(status)
  const loadingMessageAnimationState = status === 'loading' ? 'enter' : 'exit'
  const successMessageAnimationState = status === 'success' ? 'enter' : 'exit'

  const formSubmit = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'loading') {
      formSubmit.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }, [status, formSubmit])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'success') {
        onSuccess && onSuccess()
      }
      if (status === 'error') {
        onError && onError()
      }
    }, delayResponse)
    return () => clearTimeout(timer)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <div ref={formSubmit} className={styles.buttonLoaderContainer} {...props}>
      <Button
        type={buttonType}
        className={clsx(status === 'loading' && 'btn-loading')}
        htmlType="submit"
        block
        tabIndex={tabIndex}
        disabled={disabled}
      >
        {iconType ? <Icon type={iconType} className={clsx([styles.iconContainer])} /> : children}
      </Button>
      <motion.div
        className={styles.messageContainer}
        initial={loadingMessageAnimationState}
        animate={loadingMessageAnimationState}
        variants={enteringFromTop}
      >
        <span className={styles.message}>{loadingMessage}</span>
      </motion.div>
      <motion.div
        className={styles.messageContainer}
        initial={successMessageAnimationState}
        animate={successMessageAnimationState}
        variants={enteringFromTop}
      >
        <span className={styles.message}>{successMessage}</span>
      </motion.div>
    </div>
  )
}

export default FormSubmit
