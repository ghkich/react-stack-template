import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'

import { RoutePaths } from '../../routes'
import styles from './Button.module.scss'

type ButtonType = 'primary' | 'success' | 'link'
interface BaseButtonProps {
  to?: RoutePaths
  type?: ButtonType
  icon?: string
  loading?: boolean
  className?: string
  ghost?: boolean
  block?: boolean
  children?: React.ReactNode
}
type ButtonHTMLType = 'submit' | 'button' | 'reset'
type AnchorButtonProps = {
  href: string
  target?: string
  onClick?: React.MouseEventHandler<HTMLElement>
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>
type NativeButtonProps = {
  htmlType?: ButtonHTMLType
  onClick?: React.MouseEventHandler<HTMLElement>
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>
type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>

const Button: React.FC<ButtonProps> = ({
  htmlType = 'button',
  href,
  to,
  type,
  className,
  loading,
  ghost,
  block,
  disabled,
  children,
  ...props
}) => {
  const typeCls = type && `btn-${type}`
  const ghostCls = ghost && 'btn-ghost'
  const blockCls = block && 'btn-block'

  const classNames = clsx([styles.buttonContainer, className, typeCls, ghostCls, blockCls])

  if (href) {
    return (
      <a href={href} className={classNames} {...props}>
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={classNames} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={htmlType}
      className={classNames}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      {...props}
    >
      {loading ? '...' : children}
    </button>
  )
}

export default Button
