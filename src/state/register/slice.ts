import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getLocalItem } from '../../utils/storage-utils'
import { useAppState } from '../store'
import { RegisterState } from './types'

const initialAuth: RegisterState = {
  cpf: '',
  cnpj: '',
}

const persistedAuth: RegisterState = getLocalItem('register')
const initialOrPersistedAuth: RegisterState = persistedAuth ? persistedAuth : initialAuth

const registerSlice = createSlice({
  name: 'register',
  initialState: initialOrPersistedAuth,
  reducers: {
    setCpf: (state, action: PayloadAction<string>) => {
      state.cpf = action.payload
    },
  },
})

export const registerActions = registerSlice.actions
export const useRegisterState = () => useAppState((state) => state.register)

export default registerSlice.reducer
