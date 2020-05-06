export interface Notification {
  type: 'error'
  message: string
}

export interface UiState {
  notifications: Notification[]
}
