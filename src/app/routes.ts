import React from 'react'
import { RouteProps } from 'react-router-dom'

import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import CreateOrder from '../pages/orders/CreateOrder'
import Orders from '../pages/orders/Orders'
import ViewOrder from '../pages/orders/ViewOrder'
import RegisterCnpj from '../pages/register/RegisterCnpj'
import RegisterCnpj2 from '../pages/register/RegisterCnpj2'
import RegisterCpf from '../pages/register/RegisterCpf'
import RegisterCpf2 from '../pages/register/RegisterCpf2'

export enum RoutePaths {
  REGISTER_CNPJ = '/criar-conta-empresa',
  REGISTER_CNPJ_2 = '/criar-conta-empresa/:cnpj',
  REGISTER_CPF = '/criar-conta-pessoal',
  REGISTER_CPF_2 = '/criar-conta-pessoal/:cpf',
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
    exact: true,
    path: RoutePaths.REGISTER_CNPJ,
    component: RegisterCnpj,
  },
  {
    path: RoutePaths.REGISTER_CNPJ_2,
    component: RegisterCnpj2,
  },
  {
    exact: true,
    path: RoutePaths.REGISTER_CPF,
    component: RegisterCpf,
  },
  {
    path: RoutePaths.REGISTER_CPF_2,
    component: RegisterCpf2,
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
    component: Orders,
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
