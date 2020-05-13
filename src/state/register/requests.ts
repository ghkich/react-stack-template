import { AxiosResponse } from 'axios'
import { create } from 'domain'
import { useState } from 'react'

import API from '../../api/config'
import { ERRORS } from '../../api/errors'
import { ApiError, ApiStatus } from '../../api/types'
import { Account } from './types'

export const useCreateAccount = () => {
  const [error, setError] = useState<ApiError>()
  const [status, setStatus] = useState<ApiStatus>('idle')

  const call = async (createAccount: Account) => {
    try {
      setStatus('loading')
      const response: AxiosResponse<Account> = await API.post('/accounts', createAccount)
      setStatus('success')
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
