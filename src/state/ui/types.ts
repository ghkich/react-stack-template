export interface Notification {
  id: string
  type: 'error'
  message: string
  description: string
}

export interface UiState {
  notifications: Notification[]
}
