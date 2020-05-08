import clsx from 'clsx'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'

import { ReactComponent as IconLoading } from '../../images/icon-loading.svg'
import { ReactComponent as IconSuccess } from '../../images/inr-checkmark-circle.svg'
import { enteringFromTop } from '../../utils/animation-utils'
import Button, { ButtonType } from '../Button/Button'
import styles from './ButtonLoader.module.scss'

export type ButtonLoaderStatus = 'loading' | 'success' | 'error' | 'idle'

interface ButtonLoaderProps {
  status: ButtonLoaderStatus
  loadingMessage?: string
  successMessage?: string
  delayResponse?: number
  onSuccess?: () => void
  tabIndex?: number
}

const getButtonPropsByStatus = (status: ButtonLoaderStatus) => {
  let buttonIcon
  let buttonType: ButtonType = 'primary'

  if (status === 'loading') {
    buttonIcon = <IconLoading />
    buttonType = 'default'
  }

  if (status === 'success') {
    buttonIcon = <IconSuccess />
    buttonType = 'success'
  }

  // if (status === 'error') {
  //   buttonIcon = <IconError />
  //   buttonType = 'primary'
  // }

  return {
    buttonIcon,
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
  children,
}) => {
  const buttonProps = getButtonPropsByStatus(status)

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
      >
        {buttonProps.buttonIcon ? (
          <span className={clsx([styles.iconContainer, status === 'loading' && styles.iconSpinning])}>
            {buttonProps.buttonIcon}
          </span>
        ) : (
          children
        )}
      </Button>
      <motion.div
        className={styles.messageContainer}
        initial={status === 'loading' ? 'enter' : 'exit'}
        animate={status === 'loading' ? 'enter' : 'exit'}
        variants={enteringFromTop}
      >
        <div style={{ fontSize: 13, textAlign: 'center', userSelect: 'none' }}>{loadingMessage}</div>
      </motion.div>
      <motion.div
        className={styles.messageContainer}
        initial={status === 'success' ? 'enter' : 'exit'}
        animate={status === 'success' ? 'enter' : 'exit'}
        variants={enteringFromTop}
      >
        <div style={{ fontSize: 13, textAlign: 'center', userSelect: 'none' }}>{successMessage}</div>
      </motion.div>
    </div>
  )
}

export default ButtonLoader
