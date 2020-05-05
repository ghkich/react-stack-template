import faker from 'faker'

import { Auth } from '../state/auth/types'
import { Order } from '../state/order/types'

// const blowson = require('blowson')

faker.locale = 'pt_BR'
const blowson = require('blowson')

faker.seed(123)

export const auth: Auth = {
  access_token: faker.random.alphaNumeric(25),
  can_insert_credits: faker.random.boolean(),
  can_order_document: faker.random.boolean(),
  can_see_financial_transactions: faker.random.boolean(),
  can_see_reports: faker.random.boolean(),
  customer_id: faker.random.number(10),
  email: faker.internet.email(),
  id: faker.random.number(10),
  is_admin: faker.random.boolean(),
  last_api_request: faker.date.recent(1).toISOString(),
  last_login: faker.date.recent(1).toISOString(),
  name: faker.name.findName(),
  phone: faker.phone.phoneNumber('999999999'),
}

const extendedOrders = blowson({
  data: [
    {
      id: 1,
      user_id: 1,
      document_type_id: 1,
      current_status_id: 4,
      priority: 0,
      placed_time: '2020-05-02',
      estimated_time: '2020-05-09',
      delivered_time: null,
    },
    {
      id: 50,
      user_id: 20,
      document_type_id: 1,
      current_status_id: 4,
      priority: 0,
      placed_time: '2020-04-02',
      estimated_time: '2020-04-09',
      delivered_time: null,
    },
  ],
})

export const orders: Order[] = extendedOrders.data
