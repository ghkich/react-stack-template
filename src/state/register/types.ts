export interface RegisterState {
  cnpj: string
  cpf: string
}
export type CustomerEntityType = 'PJ' | 'PF'

export interface CreateAccount {
  customer_entity_type: 'PJ' | 'PF'
  customer_document_number: string
  customer_address_public_place?: string
  customer_address_number?: string
  customer_address_complement?: string
  customer_address_neighborhood?: string
  customer_address_city?: string
  customer_address_uf?: string
  corporate_name?: string
  user_name: string
  user_email: string
  user_phone?: string
  user_password: string
}
