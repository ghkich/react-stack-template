import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {getLocalItem} from '../../utils/storage-utils'
import {useAppState} from '../store'
import {AuthState} from './types'

export const initialAuthState: AuthState = {
  access_token: '',
  can_insert_credits: false,
  can_order_document: false,
  can_see_financial_transactions: false,
  can_see_reports: false,
  customer_id: 0,
  email: '',
  id: 0,
  is_admin: false,
  last_api_request: '',
  last_login: '',
  name: '',
  phone: '',
}

const persistedAuthState: AuthState = getLocalItem('auth')
const initialOrPersistedAuth: AuthState = persistedAuthState ? persistedAuthState : initialAuthState

const authSlice = createSlice({
  name: 'auth',
  initialState: initialOrPersistedAuth,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => action.payload,
    removeAuth: () => initialAuthState,
  },
})

export const authActions = authSlice.actions
export const useAuthState = () => useAppState((state) => state.auth)

export default authSlice.reducer
