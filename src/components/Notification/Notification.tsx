import clsx from 'clsx'
import React from 'react'

import styles from './Notification.module.scss'

interface NotificationProps extends React.HTMLAttributes<HTMLElement> {
  type: 'success' | 'warning' | 'error'
  message: string
  description: string
}

const Notification: React.FC<NotificationProps> = ({ type, message, description, ...props }) => {
  return (
    <div className={clsx([styles.notificationContainer, `notification-${type}`])} {...props}>
      <span className={styles.notificationMessage}>{message}</span>
      <span className={styles.notificationDescription}>{description}</span>
    </div>
  )
}

export default Notification
