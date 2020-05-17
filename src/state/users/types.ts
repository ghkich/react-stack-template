export interface User {
  can_insert_credits: boolean
  can_order_document: boolean
  can_see_financial_transactions: boolean
  can_see_reports: boolean
  customer_id: number
  email: string
  id: number
  is_admin: boolean
  last_api_request: string
  last_login: string
  name: string
  phone: string
}
