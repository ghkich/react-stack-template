import clsx from 'clsx'
import React from 'react'

import { ReactComponent as IconChart } from '../../images/icon-chart.svg'
import { ReactComponent as IconCheckmarkCircle } from '../../images/icon-checkmark-circle.svg'
import { ReactComponent as IconChevronDown } from '../../images/icon-chevron-down.svg'
import { ReactComponent as IconChevronUp } from '../../images/icon-chevron-up.svg'
import { ReactComponent as IconCrossCircle } from '../../images/icon-cross-circle.svg'
import { ReactComponent as IconCrown } from '../../images/icon-crown.svg'
import { ReactComponent as IconFolder } from '../../images/icon-folder.svg'
import { ReactComponent as IconHome } from '../../images/icon-home.svg'
import { ReactComponent as IconInvoice } from '../../images/icon-invoice.svg'
import { ReactComponent as IconLoading } from '../../images/icon-loading.svg'
import { ReactComponent as IconMoney } from '../../images/icon-money.svg'
import { ReactComponent as IconMenu } from '../../images/icon-nav.svg'
import { ReactComponent as IconPaperPlane } from '../../images/icon-paper-plane.svg'
import styles from './Icon.module.scss'

export type IconType =
  | 'loading'
  | 'checkmark-circle'
  | 'cross-circle'
  | 'nav'
  | 'home'
  | 'folder'
  | 'money'
  | 'invoice'
  | 'chart'
  | 'paper-plane'
  | 'crown'
  | 'chevron-down'
  | 'chevron-up'

interface IconProps {
  type: IconType
  className?: string
  style?: React.CSSProperties
}

const Icon: React.FC<IconProps> = ({ type, className, style }) => {
  const loadingClx = type === 'loading' && styles.iconSpinning

  const iconProps = {
    className: clsx([styles.iconContainer, loadingClx, className]),
    style,
  }

  switch (type) {
    case 'loading':
      return <IconLoading {...iconProps} />
    case 'nav':
      return <IconMenu {...iconProps} />
    case 'home':
      return <IconHome {...iconProps} />
    case 'folder':
      return <IconFolder {...iconProps} />
    case 'money':
      return <IconMoney {...iconProps} />
    case 'invoice':
      return <IconInvoice {...iconProps} />
    case 'chart':
      return <IconChart {...iconProps} />
    case 'paper-plane':
      return <IconPaperPlane {...iconProps} />
    case 'checkmark-circle':
      return <IconCheckmarkCircle {...iconProps} />
    case 'cross-circle':
      return <IconCrossCircle {...iconProps} />
    case 'crown':
      return <IconCrown {...iconProps} />
    case 'chevron-down':
      return <IconChevronDown {...iconProps} />
    case 'chevron-up':
      return <IconChevronUp {...iconProps} />
    default:
      throw new Error('No Icon found for the type informed')
  }
}

export default Icon
