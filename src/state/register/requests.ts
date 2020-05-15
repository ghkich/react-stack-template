import { useState } from 'react'

import API from '../../api/config'
import { ERRORS } from '../../api/errors'
import { ApiError, ApiStatus } from '../../api/types'
import { CreateAccount } from './types'

export const useCreateAccount = () => {
  const [error, setError] = useState<ApiError | null>(null)
  const [status, setStatus] = useState<ApiStatus>('idle')

  const call = async (createAccount: CreateAccount) => {
    try {
      setStatus('loading')
      setError(null)
      await API.post('/accounts', createAccount)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      if ([422].includes(error.response?.status)) {
        setError({
          ...ERRORS.dataValidation,
          description: error.response.data,
        })
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
