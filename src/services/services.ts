import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { RoutePaths } from '../routes'
import { setLocalItem } from '../utils/storage-utils'
import API from './api'
import { useAuthState } from './auth/AuthProvider'
import { Auth } from './auth/types'
import { Endpoints } from './types'

export const handleApiError = (error: any) => {
  return error
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthState()
  const history = useHistory()

  const login = async (username: string, password: string, keepMeLoggedIn: boolean) => {
    try {
      setLoading(true)
      const response: AxiosResponse<Auth> = await API.post(Endpoints.LOGIN, { username, password })
      setAuth(response.data)
      if (keepMeLoggedIn) {
        setLocalItem('auth', response.data)
      }
      history.push(RoutePaths.HOME)
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    login,
    authenticating: loading,
  }
}
