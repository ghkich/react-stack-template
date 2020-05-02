export enum Endpoints {
  LOGIN = '/users/login',
}

export interface Order {
  id: number
  user_id: number
  document_type_id: number
  current_status_id: number
  priority: number
  placed_time: string
  estimated_time: string
  delivered_time: string | null
}
