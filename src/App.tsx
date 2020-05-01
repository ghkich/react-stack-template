import './App.scss'

import React from 'react'

import MainRouter from './Router'
import AuthProvider from './services/auth/AuthProvider'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  )
}

export default App
