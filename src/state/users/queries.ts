import {AxiosResponse} from 'axios'
import {useQuery} from 'react-query'

import API, {setAuthorizationHeader} from '../../api/config'
import {getQueryError} from '../../api/errors'
import {User} from './types'

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
