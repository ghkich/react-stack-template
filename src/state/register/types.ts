export interface RegisterState {
  cpf: string
  cnpj: string
}

export interface Account {
  customer_entity_type: 'PJ' | 'PF'
  customer_name: string
  customer_document_number: string
  customer_address_public_place?: string
  customer_address_number?: string
  customer_address_complement?: string
  customer_address_neighborhood?: string
  customer_address_city?: string
  customer_address_uf?: string
  user_name: string
  user_email: string
  user_password: string
}
