import './App.scss'

import React from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { ReactQueryDevtools } from 'react-query-devtools'
import { Provider } from 'react-redux'

import Notification from '../components/Notification/Notification'
import store from '../state/store'
import { useUiState } from '../state/ui/slice'
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
  const { notifications } = useUiState()
  return <>{notifications.length > 0 && notifications.map((notification) => <Notification {...notification} />)}</>
}

const App: React.FC = () => {
  if (process.env.REACT_APP_PROTO) {
    const { startMirageServers } = require('../_mock/servers')
    startMirageServers()
  }

  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <Provider store={store}>
        <ReactQueryDevtools initialIsOpen={false} />
        <MainRouter />
        <NotificationGlobal />
      </Provider>
    </ErrorBoundary>
  )
}

export default App
