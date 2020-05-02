import Axios from 'axios'

import { getLocalItem } from '../utils/storage-utils'
import { Auth } from './auth/types'

const API = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const setAuthorizationHeader = () => {
  const auth: Auth = getLocalItem('auth')
  return { Authorization: `Bearer ${auth.access_token}` }
}

export default API
