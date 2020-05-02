import API from '../services/api'
import { Endpoints } from '../services/types'

export const injectMockAdapterIfPrototype = async () => {
  if (process.env.REACT_APP_PROTO) {
    const { auth } = await import('./data')
    const MockAdapter = require('axios-mock-adapter')
    const delayResponse = 1200

    const mockAPI = new MockAdapter(API, { delayResponse })

    mockAPI.onPost(Endpoints.LOGIN).reply(200, auth)
  }
}
