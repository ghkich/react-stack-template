import clsx from 'clsx'
import {motion} from 'framer-motion'
import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'

import {RoutePaths} from '../../app/routes'
import {ReactComponent as LogoCBRDocLettering} from '../../images/logo-cbrdoc-lettering.svg'
import {ReactComponent as LogoCBRDocSymbol} from '../../images/logo-cbrdoc-symbol.svg'
import {springTransition} from '../../utils/animation-utils'
import {getLocalItem, setLocalItem} from '../../utils/storage-utils'
import Button from '../Button/Button'
import Icon, {IconType} from '../Icon/Icon'
import styles from './SideNav.module.scss'

interface NavItem {
  id: string
  icon: IconType
  label: string
  to: RoutePaths
  show?: boolean
}

interface SideNavProps {
  mainNavItem: NavItem
  navItems: NavItem[]
}

const navCollapsing = {
  collapsed: {
    width: 105,
  },
  normal: {
    width: 255,
  },
}

const SideNav: React.FC<SideNavProps> = ({mainNavItem, navItems}) => {
  const [navCollapsed, setNavCollapsed] = useState(getLocalItem('navCollapsed') ? true : false)
  const collapsedClx = navCollapsed && 'nav-collapsed'

  function handleToggleCollapse() {
    setNavCollapsed(!navCollapsed)
    setLocalItem('navCollapsed', !navCollapsed ? 'true' : '')
  }

  return (
    <motion.div
      className={clsx([styles.sideNavContainer, collapsedClx])}
      initial={navCollapsed ? 'collapsed' : 'normal'}
      animate={navCollapsed ? 'collapsed' : 'normal'}
      variants={navCollapsing}
      transition={springTransition}
    >
      <div className={styles.logoContainer}>
        <LogoCBRDocSymbol className={clsx([styles.logoSymbol, collapsedClx])} />
        {!navCollapsed && <LogoCBRDocLettering color="white" />}
      </div>
      <button
        className={clsx([styles.navToggleCollapse, collapsedClx])}
        onClick={handleToggleCollapse}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Icon type="nav" />
      </button>
      <div className={styles.navItemsContainer}>
        {mainNavItem && (
          <Button type="primary" to={mainNavItem.to} className={styles.mainNavItem} block>
            {!navCollapsed && <span style={{marginRight: 8}}>{mainNavItem.label}</span>}
            <Icon type={mainNavItem.icon} style={{fontSize: '1.25em'}} />
          </Button>
        )}
        {navItems.map(
          (navItem) =>
            navItem.show && (
              <NavLink key={navItem.id} exact to={navItem.to} className={clsx([styles.navItem, collapsedClx])}>
                <Icon type={navItem.icon} className={styles.navItemIcon} />
                <div>{navItem.label}</div>
              </NavLink>
            ),
        )}
        <div className={styles.bottomNavContainer}>
          <NavLink to={RoutePaths.HELP} className={clsx([styles.navItem, collapsedClx])}>
            <Icon type="help-circle" className={styles.navItemIcon} />
          </NavLink>
          <NavLink to={RoutePaths.SETTINGS} className={clsx([styles.navItem, collapsedClx])}>
            <Icon type="gear" className={styles.navItemIcon} />
          </NavLink>
        </div>
      </div>
    </motion.div>
  )
}

export default SideNav
