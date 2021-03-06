import {motion} from 'framer-motion'
import React from 'react'

import {RoutePaths} from '../../app/routes'
import Avatar from '../../components/Avatar/Avatar'
import Dropdown from '../../components/Dropdown/Dropdown'
import Icon from '../../components/Icon/Icon'
import Menu from '../../components/Menu/Menu'
import SideNav from '../../components/SideNav/SideNav'
import {useLogoutRequest} from '../../state/auth/requests'
import {User} from '../../state/users/types'
import {enteringFromOpacity} from '../../utils/animation-utils'
import styles from './AuthenticatedLayout.module.scss'

interface Props {
  user: User
}

const AuthenticatedLayout: React.FC<Props> = ({user, children}) => {
  const logoutRequest = useLogoutRequest()

  return (
    <div className={styles.layoutContainer}>
      <SideNav
        mainNavItem={{
          id: 'create_order',
          icon: 'paper-plane',
          label: 'Fazer pedido',
          to: RoutePaths.CREATE_ORDER,
          show: user.can_order_services,
        }}
        navItems={[
          {id: 'home', icon: 'home', label: 'Início', to: RoutePaths.HOME, show: true},
          {id: 'orders', icon: 'folder', label: 'Meus pedidos', to: RoutePaths.ORDERS, show: user.can_order_services},
          {id: 'credits', icon: 'money', label: 'Créditos', to: RoutePaths.CREDITS, show: user.can_insert_credits},
          {
            id: 'invoices',
            icon: 'invoice',
            label: 'Faturas',
            to: RoutePaths.INVOICES,
            show: user.can_see_invoices,
          },
          {id: 'reports', icon: 'chart', label: 'Relatórios', to: RoutePaths.REPORTS, show: user.can_see_reports},
        ]}
      />
      <div className={styles.content}>
        <div className={styles.topbarContainer}>
          {/* <Button type="primary" icon="crown" size="small" ghost style={{marginRight: 15}}>
            Seja GOLD
          </Button> */}
          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    label: 'Sair',
                    onClick: () => {
                      logoutRequest.call()
                    },
                  },
                ]}
              />
            }
          >
            <Avatar username={user.name} /> <Icon type="chevron-down" style={{marginLeft: 5}} />
          </Dropdown>
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
