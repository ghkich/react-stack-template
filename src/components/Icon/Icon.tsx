import clsx from 'clsx'
import React from 'react'

import { ReactComponent as IconCheckmarkCircle } from '../../images/icon-checkmark-circle.svg'
import { ReactComponent as IconCrossCircle } from '../../images/icon-cross-circle.svg'
import { ReactComponent as IconLoading } from '../../images/icon-loading.svg'
import styles from './Icon.module.scss'

export type IconType = 'loading' | 'checkmark-circle' | 'cross-circle'

interface IconProps {
  type: IconType
  className?: string
  style?: React.CSSProperties
}

function getIconByType(type: IconType) {
  switch (type) {
    case 'loading':
      return <IconLoading />
    case 'checkmark-circle':
      return <IconCheckmarkCircle />
    case 'cross-circle':
      return <IconCrossCircle />
    default:
      throw new Error('No Icon found for the type informed')
  }
}

const Icon: React.FC<IconProps> = ({ type, className, style }) => {
  const loadingClx = type === 'loading' && 'icon-loading'
  return (
    <span className={clsx([styles.iconContainer, loadingClx, className])} style={style}>
      {getIconByType(type)}
    </span>
  )
}

export default Icon
