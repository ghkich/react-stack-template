import './App.scss'

import React from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'

import MainRouter from './Router'
import AuthProvider from './services/auth/AuthProvider'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <MainRouter />
    </AuthProvider>
  )
}

export default App
