import { motion } from 'framer-motion'
import React from 'react'

import SideMenu from '../components/SideMenu/SideMenu'
import { RoutePaths } from '../routes'
import { enteringFromOpacity } from '../utils/animation-utils'
import styles from './AuthenticatedLayout.module.scss'

interface Props {}

const AuthenticatedLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <SideMenu
        mainNavItem={{ id: 'create_order', label: 'Fazer pedido', to: RoutePaths.CREATE_ORDER, show: true }}
        navItems={[
          { id: 'home', label: 'Início', to: RoutePaths.HOME, show: true },
          { id: 'orders', label: 'Meus pedidos', to: RoutePaths.ORDERS, show: true },
          { id: 'credits', label: 'Créditos', to: RoutePaths.CREDITS, show: true },
          { id: 'invoices', label: 'Faturas', to: RoutePaths.INVOICES, show: true },
          { id: 'reports', label: 'Relatórios', to: RoutePaths.REPORTS, show: true },
        ]}
      />
      <div className={styles.content}>
        <div className={styles.topbarContainer}></div>
        <motion.div
          className={styles.pageContainer}
          initial="exit"
          animate="enter"
          exit="exit"
          variants={enteringFromOpacity}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export default AuthenticatedLayout
