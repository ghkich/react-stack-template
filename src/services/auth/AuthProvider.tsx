import React, { createContext, useContext, useState } from 'react'

import { getLocalItem } from '../../utils/storage-utils'
import { Auth } from './types'

export const initialAuth: Auth = {
  access_token: '',
}

const persistedAuth: Auth = getLocalItem('auth')
const initialOrPersistedAuth: Auth = persistedAuth ? persistedAuth : initialAuth

interface ContextState {
  auth: Auth
  setAuth: (auth: Auth) => void
}

const initialContextState: ContextState = {
  auth: initialAuth,
  setAuth: () => {},
}

export const AuthContext = createContext<ContextState>(initialContextState)

export const useAuthContextValue = () => {
  const [authState, setAuthState] = useState(initialOrPersistedAuth)

  return {
    auth: authState,
    setAuth: (auth: Auth) => {
      setAuthState(auth)
    },
  }
}

const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  return <AuthContext.Provider value={useAuthContextValue()}>{children}</AuthContext.Provider>
}

export const useAuthState = () => useContext(AuthContext)

export default AuthProvider
