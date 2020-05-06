import Axios from 'axios'

import { AuthState } from '../features/auth/types'
import { getLocalItem } from '../utils/storage-utils'

const API = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const setAuthorizationHeader = () => {
  const authState: AuthState = getLocalItem('auth')
  return { Authorization: `Bearer ${authState.access_token}` }
}

export default API
