import clsx from 'clsx'
import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { ReactComponent as IconLoading } from '../../images/icon-loading.svg'
import styles from './Button.module.scss'

export type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'link'
interface BaseButtonProps extends Partial<LinkProps> {
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
  const typeClx = type && `btn-${type}`
  const ghostClx = ghost && 'btn-ghost'
  const blockClx = block && 'btn-block'
  const loadingClx = loading && 'btn-loading'

  const classNames = clsx([styles.buttonContainer, className, typeClx, ghostClx, blockClx, loadingClx])

  if (href) {
    return (
      <a href={href} className={classNames} {...props}>
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={classNames} onMouseDown={(e) => e.preventDefault()} {...props}>
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
      {loading ? <IconLoading className={styles.loadingIcon} /> : children}
    </button>
  )
}

export default Button
