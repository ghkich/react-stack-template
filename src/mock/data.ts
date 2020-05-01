import faker from 'faker'

import { Auth } from '../services/auth/types'

// const blowson = require('blowson')

faker.locale = 'pt_BR'

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
