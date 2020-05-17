import React from 'react'

import {fakeAuth} from '../../_mock/data'
import {render} from '../../utils/test-utils'
import {SwitchRoutes} from '../Router'
import {RoutePaths} from '../routes'

describe('when NOT authenticated', () => {
  test('the root path should redirect to login', () => {
    const {history} = render(<SwitchRoutes />)
    expect(history.location.pathname).toBe(RoutePaths.LOGIN)
  })

  test('a random path should redirect to login', () => {
    const {history} = render(<SwitchRoutes />, {route: '/random-path'})
    expect(history.location.pathname).toBe(RoutePaths.LOGIN)
  })

  test('an authenticated only path should redirect to login', () => {
    const {history} = render(<SwitchRoutes />, {route: RoutePaths.CREATE_ORDER})
    expect(history.location.pathname).toBe(RoutePaths.LOGIN)
  })
})

describe('when authenticated', () => {
  test('a random path should redirect to HOME', () => {
    const {history} = render(<SwitchRoutes />, {
      preloadedState: {
        auth: fakeAuth,
      },
      route: '/random-path',
    })
    expect(history.location.pathname).toBe(RoutePaths.HOME)
  })
})
