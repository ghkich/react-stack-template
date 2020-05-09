import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import API from '../../api/config'
import { ERRORS } from '../../api/errors'
import { ApiError, ApiStatus, Endpoints } from '../../api/types'
import { removeLocalItem, setLocalItem } from '../../utils/storage-utils'
import { authActions } from './slice'
import { AuthState } from './types'

export const useLoginRequest = () => {
  const [error, setError] = useState<ApiError>()
  const [status, setStatus] = useState<ApiStatus>('idle')
  const dispatch = useDispatch()

  const call = async (email: string, password: string, keepMeLoggedIn: boolean) => {
    try {
      setStatus('loading')
      const response: AxiosResponse<AuthState> = await API.post(Endpoints.LOGIN, { email, password })
      dispatch(authActions.setAuth(response.data))
      setLocalItem('auth', response.data)
      setStatus('success')
      if (keepMeLoggedIn) {
        //TODO: cookie!
      }
    } catch (error) {
      setStatus('error')
      if ([401, 403].includes(error.response?.status)) {
        setError(ERRORS.invalidCredentials)
      } else {
        setError(ERRORS.serverError)
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
  const dispatch = useDispatch()

  const call = () => {
    removeLocalItem('auth')
    dispatch(authActions.removeAuth())
  }

  return {
    call,
  }
}