import { motion } from 'framer-motion'
import React from 'react'

import Button from '../components/Button/Button'
import SideMenu from '../components/SideMenu/SideMenu'
import { RoutePaths } from '../routes'
import { useAuthState } from '../state/auth/AuthProvider'
import { useLogoutRequest } from '../state/auth/requests'
import { enteringFromOpacity } from '../utils/animation-utils'
import styles from './AuthenticatedLayout.module.scss'

interface Props {}

const AuthenticatedLayout: React.FC<Props> = ({ children }) => {
  const { auth } = useAuthState()
  const logoutRequest = useLogoutRequest()

  return (
    <div className={styles.layoutContainer}>
      <SideMenu
        mainNavItem={{ id: 'create_order', label: 'Fazer pedido', to: RoutePaths.CREATE_ORDER, show: true }}
        navItems={[
          { id: 'home', label: 'Início', to: RoutePaths.HOME, show: true },
          { id: 'orders', label: 'Meus pedidos', to: RoutePaths.ORDERS, show: auth.can_order_document },
          { id: 'credits', label: 'Créditos', to: RoutePaths.CREDITS, show: auth.can_insert_credits },
          { id: 'invoices', label: 'Faturas', to: RoutePaths.INVOICES, show: auth.can_see_financial_transactions },
          { id: 'reports', label: 'Relatórios', to: RoutePaths.REPORTS, show: auth.can_see_reports },
        ]}
      />
      <div className={styles.content}>
        <div className={styles.topbarContainer}>
          <h3>
            {auth.name}{' '}
            <Button type="link" onClick={() => logoutRequest.call()}>
              Sair
            </Button>
          </h3>
        </div>
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
