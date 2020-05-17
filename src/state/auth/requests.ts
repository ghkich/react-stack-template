import {AxiosResponse} from 'axios'
import {useState} from 'react'
import {useDispatch} from 'react-redux'

import API from '../../api/config'
import {ERRORS} from '../../api/errors'
import {ApiError, ApiStatus, Endpoints} from '../../api/types'
import {removeLocalItem, setLocalItem} from '../../utils/storage-utils'
import {authActions} from './slice'
import {AuthState} from './types'

export const useLogin = () => {
  const [error, setError] = useState<ApiError | null>(null)
  const [status, setStatus] = useState<ApiStatus>('idle')
  const dispatch = useDispatch()

  const call = async (email: string, password: string, keepMeLoggedIn: boolean) => {
    try {
      setStatus('loading')
      setError(null)
      const response: AxiosResponse<AuthState> = await API.post(Endpoints.LOGIN, {email, password})
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
        setError(ERRORS.internalServer)
      }
    }
  }

  return {
    call,
    error,
    status,
    resetStatus: () => setStatus('idle'),
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
