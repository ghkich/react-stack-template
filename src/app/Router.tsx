import React from 'react'
import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch, useLocation } from 'react-router-dom'

import AuthenticatedLayout from '../layouts/AuthenticatedLayout/AuthenticatedLayout'
import { useAuthState } from '../state/auth/slice'
import { authenticatedRoutes, publicRoutes, RoutePaths } from './routes'

interface AuthtenticatedRouteProps extends RouteProps {
  authenticated: boolean
  permitted?: boolean
}

const AuthtenticatedRoute: React.FC<AuthtenticatedRouteProps> = ({ children, authenticated, permitted, ...props }) => {
  return (
    <Route
      {...props}
      render={({ location }) => {
        if (!authenticated) {
          return (
            <Redirect
              to={{
                pathname: RoutePaths.LOGIN,
                state: { from: location },
              }}
            />
          )
        }

        if (!permitted) {
          return (
            <Redirect
              to={{
                pathname: RoutePaths.HOME,
                state: { from: location },
              }}
            />
          )
        }

        return children
      }}
    />
  )
}

const SwitchRoutes: React.FC = () => {
  const authState = useAuthState()
  const isAuthenticated = authState.access_token !== ''
  const location = useLocation()

  const isRoutePermitted = (routePath: RoutePaths) => {
    return true
  }

  return (
    <Switch location={location} key={location.pathname}>
      {publicRoutes.map((route, i) => (
        <Route key={i} path={route.path} exact={route.exact} component={route.component} />
      ))}
      {authenticatedRoutes.map((route, i) => (
        <AuthtenticatedRoute
          key={i}
          path={route.path}
          exact={route.exact}
          authenticated={isAuthenticated}
          permitted={isRoutePermitted(route.path)}
        >
          <AuthenticatedLayout user={authState}>
            <route.component />
          </AuthenticatedLayout>
        </AuthtenticatedRoute>
      ))}
      <Redirect to={{ pathname: isAuthenticated ? RoutePaths.HOME : RoutePaths.LOGIN, state: { from: location } }} />
    </Switch>
  )
}

const MainRouter: React.FC = () => {
  return (
    <Router>
      <SwitchRoutes />
    </Router>
  )
}

export default MainRouter
