import React from 'react'

import styles from './Avatar.module.scss'

interface AvatarProps {
  username: string
}

const Avatar: React.FC<AvatarProps> = ({username}) => {
  return <span className={styles.avatarContainer}>{username.slice(0, 2).toUpperCase()}</span>
}

export default Avatar
