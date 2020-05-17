import {AxiosResponse} from 'axios'
import {useState} from 'react'
import {useQuery} from 'react-query'

import API, {setAuthorizationHeader} from '../../api/config'
import {ERRORS, getQueryError} from '../../api/errors'
import {ApiError, ApiStatus} from '../../api/types'
import {CreateUser, User} from './types'

export const useUsersQuery = () => {
  const fetchUsers = async () => {
    const response: AxiosResponse<User[]> = await API.get('/users', {
      headers: {...setAuthorizationHeader()},
    })
    return response.data
  }

  const query = useQuery('users', fetchUsers)

  return {
    data: query.data,
    status: query.status,
    fetching: query.isFetching,
    error: getQueryError(query.status, query.error),
  }
}

export const useAddUser = () => {
  const [data, setData] = useState<User>()
  const [error, setError] = useState<ApiError | null>(null)
  const [status, setStatus] = useState<ApiStatus>('idle')

  const call = async (createUser: CreateUser) => {
    try {
      setStatus('loading')
      setError(null)
      const response: AxiosResponse<User> = await API.post('/users', createUser, {
        headers: {...setAuthorizationHeader()},
      })
      setData(response.data)
      setStatus('success')
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
    data,
    error,
    status,
    resetStatus: () => setStatus('idle'),
  }
}

export const useUpdateUser = () => {
  const [error, setError] = useState<ApiError | null>(null)
  const [status, setStatus] = useState<ApiStatus>('idle')

  const call = async (userId: number, userProps: Partial<CreateUser>) => {
    try {
      setStatus('loading')
      setError(null)
      await API.patch(`/users/${userId}`, userProps, {
        headers: {...setAuthorizationHeader()},
      })
      setStatus('success')
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
