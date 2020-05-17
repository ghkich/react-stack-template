export interface User {
  can_insert_credits: boolean
  can_order_services: boolean
  can_see_invoices: boolean
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

export interface CreateUser {
  can_insert_credits: number
  can_order_services: number
  can_see_invoices: number
  can_see_reports: number
  is_admin: number
  email: string
  password: string
  name: string
  phone: string
}
