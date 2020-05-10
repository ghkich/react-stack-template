import React from 'react'

import Icon, { IconType } from '../Icon/Icon'
import styles from './Menu.module.scss'

export interface MenuItem {
  icon?: IconType
  label: string
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

interface MenuProps {
  items: (MenuItem | {})[]
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  return (
    <ul className={styles.menu}>
      {items.map((item, i) => {
        if ('label' in item) {
          return (
            <li key={i} className={styles.menuItem}>
              <span role="button" onClick={item.onClick}>
                {item.icon && <Icon type={item.icon} />} {item.label}
              </span>
            </li>
          )
        } else {
          return <li key={i} className={styles.menuItemDivider} />
        }
      })}
    </ul>
  )
}

export default Menu
