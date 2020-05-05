import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { RoutePaths } from '../../routes'
import { removeLocalItem, setLocalItem } from '../../utils/storage-utils'
import API, { Endpoints } from '../api'
import { initialAuth, useAuthState } from './AuthProvider'
import { Auth } from './types'

export const useLogin = () => {
  const [error, setError] = useState('')
  const history = useHistory()
  const [authenticating, setAuthenticating] = useState(false)
  const { setAuth } = useAuthState()

  const login = async (email: string, password: string, keepMeLoggedIn: boolean) => {
    try {
      setAuthenticating(true)
      const response: AxiosResponse<Auth> = await API.post(Endpoints.LOGIN, { email, password })
      setAuth(response.data)
      setLocalItem('auth', response.data)
      if (keepMeLoggedIn) {
        //TODO: cookie!
      }
      history.push(RoutePaths.HOME)
    } catch (error) {
      if (error.response?.status === 403) {
        setError('E-mail ou senha inválidos')
      } else {
        setError(() => {
          throw new Error(error)
        })
      }
    } finally {
      setAuthenticating(false)
    }
  }

  return {
    login,
    authenticating,
    errorMessage: error,
  }
}

export const useLogout = () => {
  const { setAuth } = useAuthState()

  const logout = () => {
    removeLocalItem('auth')
    setAuth(initialAuth)
  }

  return {
    logout,
  }
}
