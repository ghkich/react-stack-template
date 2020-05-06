import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import API, { ApiError, ApiStatus, Endpoints, ERRORS } from '../../api/api'
import { RoutePaths } from '../../app/routes'
import { removeLocalItem, setLocalItem } from '../../utils/storage-utils'
import { uiActions } from '../ui/slice'
import { authActions } from './slice'
import { AuthState } from './types'

export const useLoginRequest = () => {
  const [error, setError] = useState<ApiError>()
  const [status, setStatus] = useState<ApiStatus>()
  const dispatch = useDispatch()
  const history = useHistory()

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
      history.push(RoutePaths.HOME)
    } catch (error) {
      setStatus('error')
      if (error.response?.status === 401) {
        setError(ERRORS.invalidCredentials)
      } else {
        uiActions.addNotification({
          type: 'error',
          message: ERRORS.serverError.message,
        })
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
