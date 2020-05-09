import faker from 'faker'

import { AuthState } from '../state/auth/types'
import { Order } from '../state/orders/types'

// const blowson = require('blowson')

faker.locale = 'pt_BR'
const blowson = require('blowson')

export const auth: AuthState = {
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
      currentStatus: {
        id: 4,
        name: 'Finalizado',
      },
      documentType: {
        id: 1,
        name: 'Certidão de nascimento',
      },
      user: {
        name: 'Admin from JHOB',
      },
      customer: {
        name: 'JHOB',
      },
    },
    {
      id: 20,
      currentStatus: {
        id: 4,
        name: 'Finalizado',
      },
      documentType: {
        id: 1,
        name: 'Certidão de nascimento',
      },
      user: {
        name: 'Admin from JHOB',
      },
      customer: {
        name: 'JHOB',
      },
    },
  ],
})

export const orders: Order[] = extendedOrders.data
