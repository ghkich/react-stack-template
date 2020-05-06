import { motion } from 'framer-motion'
import React from 'react'

import { RoutePaths } from '../../app/routes'
import Button from '../../components/Button/Button'
import SideNav from '../../components/SideNav/SideNav'
import { useLogoutRequest } from '../../features/auth/requests'
import { AuthState } from '../../features/auth/types'
import { enteringFromOpacity } from '../../utils/animation-utils'
import styles from './AuthenticatedLayout.module.scss'

interface Props {
  user: AuthState
}

const AuthenticatedLayout: React.FC<Props> = ({ user, children }) => {
  const logoutRequest = useLogoutRequest()

  return (
    <div className={styles.layoutContainer}>
      <SideNav
        mainNavItem={{
          id: 'create_order',
          label: 'Fazer pedido',
          to: RoutePaths.CREATE_ORDER,
          show: user.can_order_document,
        }}
        navItems={[
          { id: 'home', label: 'Início', to: RoutePaths.HOME, show: true },
          { id: 'orders', label: 'Meus pedidos', to: RoutePaths.ORDERS, show: user.can_order_document },
          { id: 'credits', label: 'Créditos', to: RoutePaths.CREDITS, show: user.can_insert_credits },
          { id: 'invoices', label: 'Faturas', to: RoutePaths.INVOICES, show: user.can_see_financial_transactions },
          { id: 'reports', label: 'Relatórios', to: RoutePaths.REPORTS, show: user.can_see_reports },
        ]}
      />
      <div className={styles.content}>
        <div className={styles.topbarContainer}>
          <h3>
            {user.name}{' '}
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
