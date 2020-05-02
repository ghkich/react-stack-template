import { RouteProps } from 'react-router-dom'

import Home from './pages/home/Home'
import Login from './pages/Login'
import CreateOrder from './pages/orders/CreateOrder'
import ListOrders from './pages/orders/ListOrders'
import ViewOrder from './pages/orders/ViewOrder'
import Register from './pages/Register'

export enum RoutePaths {
  REGISTER = '/criar-conta',
  LOGIN = '/login',
  HOME = '/',
  ORDERS = '/pedidos',
  CREATE_ORDER = '/pedidos/novo',
  VIEW_ORDER = '/pedidos/:id',
  CREDITS = '/creditos',
  INVOICES = '/faturas',
  REPORTS = '/relatorios',
}

interface Route extends RouteProps {
  path: RoutePaths
  component: React.ComponentType<any>
}

export const publicRoutes: Route[] = [
  {
    path: RoutePaths.REGISTER,
    component: Register,
  },
  {
    path: RoutePaths.LOGIN,
    component: Login,
  },
]

export const authenticatedRoutes: Route[] = [
  {
    exact: true,
    path: RoutePaths.HOME,
    component: Home,
  },
  {
    exact: true,
    path: RoutePaths.ORDERS,
    component: ListOrders,
  },
  {
    path: RoutePaths.CREATE_ORDER,
    component: CreateOrder,
  },
  {
    path: RoutePaths.VIEW_ORDER,
    component: ViewOrder,
  },
]
