import clsx from 'clsx'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'

import { enteringFromTop } from '../../utils/animation-utils'
import Button, { ButtonType } from '../Button/Button'
import Icon, { IconType } from '../Icon/Icon'
import styles from './ButtonLoader.module.scss'

export type ButtonLoaderStatus = 'loading' | 'success' | 'error' | 'idle'

interface ButtonLoaderProps {
  status: ButtonLoaderStatus
  loadingMessage?: string
  successMessage?: string
  delayResponse?: number
  onSuccess?: () => void
  tabIndex?: number
  disabled?: boolean
}

function getButtonPropsByStatus(status: ButtonLoaderStatus) {
  let iconType: IconType | null = null
  let buttonType: ButtonType = 'primary'

  if (status === 'loading') {
    iconType = 'loading'
    buttonType = 'default'
  }

  if (status === 'success') {
    iconType = 'checkmark-circle'
    buttonType = 'success'
  }

  if (status === 'error') {
    iconType = 'cross-circle'
    buttonType = 'danger'
  }

  return {
    iconType,
    buttonType,
  }
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  status,
  loadingMessage,
  successMessage,
  delayResponse = 0,
  onSuccess,
  tabIndex,
  disabled,
  children,
}) => {
  const buttonProps = getButtonPropsByStatus(status)
  const loadingMessageAnimationState = status === 'loading' ? 'enter' : 'exit'
  const successMessageAnimationState = status === 'success' ? 'enter' : 'exit'

  useEffect(() => {
    if (status === 'success' && onSuccess) {
      setTimeout(() => {
        onSuccess()
      }, delayResponse)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <div className={styles.buttonLoaderContainer}>
      <Button
        type={buttonProps.buttonType}
        className={clsx(status === 'loading' && 'btn-loading')}
        htmlType="submit"
        block
        tabIndex={tabIndex}
        disabled={disabled}
      >
        {buttonProps.iconType ? (
          <Icon type={buttonProps.iconType} className={clsx([styles.iconContainer])} />
        ) : (
          children
        )}
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

export default ButtonLoader
