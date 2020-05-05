import './App.scss'

import React from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { ReactQueryDevtools } from 'react-query-devtools'

import MainRouter from './Router'
import AuthProvider from './state/auth/AuthProvider'

const ErrorFallback: React.FC<FallbackProps> = ({ error, componentStack, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <MainRouter />
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
