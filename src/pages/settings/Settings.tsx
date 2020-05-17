import React from 'react'
import {Route, Switch} from 'react-router-dom'

import TabsNav from '../../components/TabsNav/TabsNav'
import PageLayout from '../../layouts/PageLayout/PageLayout'
import Profile from './components/Profile'
import Users from './components/Users'

interface Props {}

const Settings: React.FC<Props> = (props) => {
  return (
    <PageLayout title="Configurações">
      <TabsNav
        navItems={[
          {id: 'profile-tab', label: 'Dados principais', to: '/configuracoes', exact: true},
          {id: 'users-tab', label: 'Usuários', to: '/configuracoes/usuarios', hide: false},
        ]}
      />
      <div style={{margin: 30}}>
        <Switch>
          <Route component={Profile} exact path="/configuracoes" />
          <Route component={Users} path="/configuracoes/usuarios" />
        </Switch>
      </div>
    </PageLayout>
  )
}

export default Settings
