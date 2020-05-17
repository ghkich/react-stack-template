import React from 'react'
import {NavLink, NavLinkProps} from 'react-router-dom'

import styles from './TabsNav.module.scss'

interface TabNavItem extends NavLinkProps {
  id: string
  label: string
  hide?: boolean
}

interface TabsNavProps {
  navItems: TabNavItem[]
}

const TabsNav: React.FC<TabsNavProps> = ({navItems}) => {
  return (
    <div className={styles.navContainer}>
      {navItems.map(({id, label, to, exact, hide}) => {
        if (!hide) {
          return (
            <NavLink key={id} to={to} exact={exact} className={styles.navItem}>
              {label}
            </NavLink>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}

export default TabsNav
