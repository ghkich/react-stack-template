import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { RoutePaths } from '../../routes'
import { springTransition } from '../../utils/animation-utils'
import { getLocalItem, setLocalItem } from '../../utils/storage-utils'
import styles from './SideMenu.module.scss'

interface NavItem {
  id: string
  label: string
  to: RoutePaths
  show: boolean
}

interface Props {
  mainNavItem: NavItem
  navItems: NavItem[]
}

const menuCollapsing = {
  collapsed: {
    width: 105,
  },
  normal: {
    width: 255,
  },
}

const SideMenu: React.FC<Props> = ({ mainNavItem, navItems }) => {
  const [menuCollapsed, setMenuCollapsed] = useState(getLocalItem('menuCollapsed') ? true : false)

  const handleToggleCollapse = () => {
    setMenuCollapsed(!menuCollapsed)
    setLocalItem('menuCollapsed', !menuCollapsed ? 'true' : '')
  }

  return (
    <motion.div
      className={styles.sideMenuContainer}
      initial={menuCollapsed ? 'collapsed' : 'normal'}
      animate={menuCollapsed ? 'collapsed' : 'normal'}
      variants={menuCollapsing}
      transition={springTransition}
    >
      <h1>CBRdoc</h1>
      <button
        className={styles.toggleMenuButton}
        onClick={handleToggleCollapse}
        onMouseDown={(e) => e.preventDefault()}
      >
        M
      </button>
      <div className={styles.navItemsContainer}>
        {mainNavItem && (
          <Link to={mainNavItem.to} className={styles.mainNavItem}>
            {mainNavItem.label}
          </Link>
        )}
        {navItems.map(
          (navItem) =>
            navItem.show && (
              <NavLink key={navItem.id} exact to={navItem.to} className={styles.navItem}>
                {navItem.label}
              </NavLink>
            ),
        )}
      </div>
    </motion.div>
  )
}

export default SideMenu
