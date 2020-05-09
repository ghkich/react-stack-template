import clsx from 'clsx'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { RoutePaths } from '../../app/routes'
import { ReactComponent as IconPaperPlane } from '../../images/icon-paper-plane.svg'
import { ReactComponent as LogoCBRDocLettering } from '../../images/logo-cbrdoc-lettering.svg'
import { ReactComponent as LogoCBRDocSymbol } from '../../images/logo-cbrdoc-symbol.svg'
import { springTransition } from '../../utils/animation-utils'
import { getLocalItem, setLocalItem } from '../../utils/storage-utils'
import Button from '../Button/Button'
import styles from './SideNav.module.scss'

interface NavItem {
  id: string
  label: string
  to: RoutePaths
  show?: boolean
}

interface SideNavProps {
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

const SideNav: React.FC<SideNavProps> = ({ mainNavItem, navItems }) => {
  const [menuCollapsed, setMenuCollapsed] = useState(getLocalItem('menuCollapsed') ? true : false)
  const collapsedClx = menuCollapsed && 'menu-collapsed'

  function handleToggleCollapse() {
    setMenuCollapsed(!menuCollapsed)
    setLocalItem('menuCollapsed', !menuCollapsed ? 'true' : '')
  }

  return (
    <motion.div
      className={clsx([styles.sideMenuContainer, collapsedClx])}
      initial={menuCollapsed ? 'collapsed' : 'normal'}
      animate={menuCollapsed ? 'collapsed' : 'normal'}
      variants={menuCollapsing}
      transition={springTransition}
    >
      <div className={styles.logoContainer}>
        <LogoCBRDocSymbol className={clsx([styles.logoSymbol, collapsedClx])} />
        {!menuCollapsed && <LogoCBRDocLettering color="white" />}
      </div>
      <button
        className={styles.toggleMenuButton}
        onClick={handleToggleCollapse}
        onMouseDown={(e) => e.preventDefault()}
      >
        M
      </button>
      <div className={styles.navItemsContainer}>
        {mainNavItem && (
          <Button type="primary" to={mainNavItem.to} block>
            {!menuCollapsed && <span style={{ marginRight: 8 }}>{mainNavItem.label}</span>}
            <IconPaperPlane style={{ fontSize: '1.25em' }} />
          </Button>
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

export default SideNav
