import clsx from 'clsx'
import React from 'react'

import { ReactComponent as IconAlert } from '../../images/icon-alert.svg'
import styles from './Alert.module.scss'

interface AlertProps extends React.HTMLAttributes<HTMLElement> {
  type: 'success' | 'warning' | 'error'
  message: string
  description?: string
}

const Alert: React.FC<AlertProps> = ({ type, description, message, ...props }) => {
  return (
    <div className={clsx([styles.alertContainer, `alert-${type}`])} {...props}>
      <IconAlert className={styles.alertIcon} />
      <div>
        <span className={clsx([styles.alertMessage, description && 'alert-message-with-description'])}>{message}</span>
        {description && <span className={styles.alertDescription}>{description}</span>}
      </div>
    </div>
  )
}

export default Alert
