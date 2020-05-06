import './App.scss'

import React from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { ReactQueryDevtools } from 'react-query-devtools'
import { Provider } from 'react-redux'

import store from '../features/store'
import MainRouter from './Router'

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

const NotificationGlobal = () => {
  return null
  // const { notificationState } = useUIState()
  // return notificationState && <div>{notificationState.message}</div>
}

const App: React.FC = () => {
  if (process.env.REACT_APP_PROTO) {
    const { startMirageServers } = require('../mirage/servers')
    startMirageServers()
  }

  return (
    <Provider store={store}>
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <ReactQueryDevtools initialIsOpen={false} />
        <MainRouter />
        <NotificationGlobal />
      </ErrorBoundary>
    </Provider>
  )
}

export default App
