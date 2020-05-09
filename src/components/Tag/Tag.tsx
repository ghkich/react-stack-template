import clsx from 'clsx'
import React from 'react'

import styles from './Tag.module.scss'

declare const TagColors: ['success', 'danger', 'info']

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
  color?: typeof TagColors[number]
}

const Tag: React.FC<TagProps> = ({ color, className, children, ...props }) => {
  const colorClx = color && `tag-color-${color}`
  return (
    <span className={clsx([styles.tagContainer, colorClx, className])} {...props}>
      {children}
    </span>
  )
}

export default Tag
