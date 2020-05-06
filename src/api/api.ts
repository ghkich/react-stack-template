import Axios from 'axios'

import { AuthState } from '../features/auth/types'
import { getLocalItem } from '../utils/storage-utils'

const API = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const setAuthorizationHeader = () => {
  const authState: AuthState = getLocalItem('auth')
  return { Authorization: `Bearer ${authState.access_token}` }
}

export enum Endpoints {
  LOGIN = '/users/login',
}

export type ApiStatus = 'loading' | 'success' | 'error'

export interface ApiError {
  message: string
  tip?: string
}

export const ERRORS: Record<string, ApiError> = {
  invalidCredentials: {
    message: 'E-mail ou senha inválidos',
    tip: 'Por favor, verifique as informações enviadas',
  },
  serverError: {
    message: 'Falha de comunicação com o servidor',
    tip: 'Tente novamente mais tarde',
  },
  unexpected: {
    message: 'Algo inesperado aconteceu',
    tip: 'Tente novamente mais tarde',
  },
  forbiddenAccess: {
    message: 'Sem permissão de acesso',
    tip: 'Fale com o administrador',
  },
  queryFailed: {
    message: 'Não foi possível carregar essa informação',
    tip: 'Tente recarregar a página',
  },
}

export const getQueryError = (status: ApiStatus, err: unknown) => {
  let error: ApiError | undefined

  if (status === 'error') {
    error = ERRORS.queryFailed
  }

  return error
}

export default API
