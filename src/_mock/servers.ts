import { Response, Server } from 'miragejs'

import * as data from './data'
import { getUrlParam } from './utils'

const { auth, orders } = data

export const startMirageServers = () => {
  const delayResponse = 1500
  const scenario = getUrlParam('scenario')

  new Server({
    models: {},
    seeds(server) {},
    routes() {
      this.urlPrefix = process.env.REACT_APP_API_URL || ''
      this.namespace = '/'
      this.timing = delayResponse

      this.post('/login', () => {
        switch (scenario) {
          case 'loginUnauthorized':
            return new Response(401)
          case 'serverError':
            return new Response(500)
          case 'loginUnexpected':
            return new Response(403)
          default:
            return new Response(200, {}, auth)
        }
      })
      this.get('/orders', () => {
        if (scenario === 'ordersFailed') {
          return new Response(403)
        } else {
          return new Response(201, { 'x-pagination-page-count': '5' }, orders)
        }
      })
    },
  })
}
