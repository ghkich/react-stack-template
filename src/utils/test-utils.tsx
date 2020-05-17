import {configureStore, DeepPartial} from '@reduxjs/toolkit'
import {render as renderRtl, RenderOptions} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import React from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'

import {RoutePaths} from '../app/routes'
import {AppState, rootReducer} from '../state/store'

interface CustomRenderOptions {
  preloadedState?: DeepPartial<AppState>
  route?: RoutePaths | string
  renderOptions?: RenderOptions
}

export function render(ui: React.ReactElement, options?: CustomRenderOptions) {
  const history = createMemoryHistory({initialEntries: [options?.route || '/']})

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: options?.preloadedState,
  })
  function Wrapper({children}: any) {
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    )
  }
  return {
    ...renderRtl(ui, {wrapper: Wrapper, ...options?.renderOptions}),
    history,
  }
}
