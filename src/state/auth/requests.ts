import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { RoutePaths } from '../../routes'
import { removeLocalItem, setLocalItem } from '../../utils/storage-utils'
import API, { Endpoints } from '../api'
import ERRORS from '../errors'
import { StateError, StateStatus } from '../types'
import { initialAuth, useAuthState } from './AuthProvider'
import { Auth } from './types'

export const useLoginRequest = () => {
  const [error, setError] = useState<StateError>()
  const [status, setStatus] = useState<StateStatus>()
  const { setAuth } = useAuthState()
  const history = useHistory()

  const call = async (email: string, password: string, keepMeLoggedIn: boolean) => {
    try {
      setStatus('loading')
      const response: AxiosResponse<Auth> = await API.post(Endpoints.LOGIN, { email, password })
      setAuth(response.data)
      setLocalItem('auth', response.data)
      setStatus('success')
      if (keepMeLoggedIn) {
        //TODO: cookie!
      }
      history.push(RoutePaths.HOME)
    } catch (error) {
      setStatus('error')
      if (error.response?.status === 401) {
        setError(ERRORS.invalidCredentials)
      } else {
        setError(ERRORS.unexpected)
      }
    }
  }

  return {
    call,
    status,
    error,
  }
}

export const useLogoutRequest = () => {
  const { setAuth } = useAuthState()

  const call = () => {
    removeLocalItem('auth')
    setAuth(initialAuth)
  }

  return {
    call,
  }
}
