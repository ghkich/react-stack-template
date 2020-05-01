import { AxiosResponse } from 'axios'
import { useState } from 'react'

import { removeLocalItem, setLocalItem } from '../utils/storage-utils'
import API from './api'
import { initialAuth, useAuthState } from './auth/AuthProvider'
import { Auth } from './auth/types'
import { Endpoints } from './types'

export const handleApiError = (error: any) => {
  return error
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthState()

  const login = async (email: string, password: string, keepMeLoggedIn: boolean) => {
    try {
      setLoading(true)
      const response: AxiosResponse<Auth> = await API.post(Endpoints.LOGIN, { email, password })
      setAuth(response.data)
      if (keepMeLoggedIn) {
        setLocalItem('auth', response.data)
      }
      return true
    } catch (error) {
      alert(error)
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
