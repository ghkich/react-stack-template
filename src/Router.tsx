import React, { useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch, useLocation } from 'react-router-dom'

import AuthenticatedLayout from './layouts/AuthenticatedLayout'
import { injectMockAdapterIfPrototype } from './mock/adapter'
import { authenticatedRoutes, publicRoutes, RoutePaths } from './routes'
import { useAuthState } from './state/auth/AuthProvider'

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
  const { auth } = useAuthState()
  const isAuthenticated = auth.access_token !== ''
  const location = useLocation()

  useEffect(() => {
    injectMockAdapterIfPrototype()
  }, [])

  const isRoutePermitted = (routePath: RoutePaths) => {
    return true
  }

  return (
    <Switch location={location} key={location.pathname}>
      {publicRoutes.map((route, i) => (
        <Route key={i} path={route.path} component={route.component} />
      ))}
      {authenticatedRoutes.map((route, i) => (
        <AuthtenticatedRoute
          key={i}
          path={route.path}
          exact={route.exact}
          authenticated={isAuthenticated}
          permitted={isRoutePermitted(route.path)}
        >
          <AuthenticatedLayout>
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
