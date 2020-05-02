import API from '../services/api'
import { Endpoints } from '../services/types'
import { orders } from './data'

export const injectMockAdapterIfPrototype = async () => {
  if (process.env.REACT_APP_PROTO) {
    const { auth } = await import('./data')
    const MockAdapter = require('axios-mock-adapter')
    const delayResponse = 1200

    const mockAPI = new MockAdapter(API, { delayResponse })

    mockAPI.onPost(Endpoints.LOGIN).reply(200, auth)

    const perPage = 10
    let page = 1
    mockAPI
      .onGet(`/customers/1/orders?per-page=${perPage}&page=${page}`)
      .reply(200, orders.slice(perPage * (page - 1), page * perPage))
    page = 2
    mockAPI
      .onGet(`/customers/1/orders?per-page=${perPage}&page=${page}`)
      .reply(200, orders.slice(perPage * (page - 1), page * perPage))
    page = 3
    mockAPI
      .onGet(`/customers/1/orders?per-page=${perPage}&page=${page}`)
      .reply(200, orders.slice(perPage * (page - 1), page * perPage))
    page = 4
    mockAPI
      .onGet(`/customers/1/orders?per-page=${perPage}&page=${page}`)
      .reply(200, orders.slice(perPage * (page - 1), page * perPage))
  }
}
