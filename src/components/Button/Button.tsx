import clsx from 'clsx'
import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { ReactComponent as IconLoading } from '../../images/icon-loading.svg'
import Icon, { IconType } from '../Icon/Icon'
import styles from './Button.module.scss'

declare const ButtonSizes: ['small', 'default', 'large']
export type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'link'
interface BaseButtonProps extends Partial<LinkProps> {
  type?: ButtonType
  size?: typeof ButtonSizes[number]
  icon?: IconType
  iconPlacement?: 'left' | 'right'
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
  icon,
  iconPlacement = 'left',
  className,
  loading,
  ghost,
  size,
  block,
  disabled,
  children,
  ...props
}) => {
  const typeClx = type && `btn-${type}`
  const ghostClx = ghost && 'btn-ghost'
  const sizeClx = size && `btn-size-${size}`
  const blockClx = block && 'btn-block'
  const loadingClx = loading && 'btn-loading'

  const classNames = clsx([styles.buttonContainer, className, typeClx, sizeClx, ghostClx, blockClx, loadingClx])

  const buttonChildren = (
    <>
      {icon && iconPlacement === 'left' && <Icon type={icon} className={styles.iconPlacementLeft} />}
      {children}
      {icon && iconPlacement === 'right' && <Icon type={icon} className={styles.iconPlacementRight} />}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classNames} {...props}>
        {buttonChildren}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={classNames} onMouseDown={(e) => e.preventDefault()} {...props}>
        {buttonChildren}
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
      {loading ? <IconLoading className={styles.loadingIcon} /> : buttonChildren}
    </button>
  )
}

export default Button
