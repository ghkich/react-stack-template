export interface Notification {
  id: string
  type: 'error'
  message: string
  description: string
}
export interface DropDownOverlayProps {
  id: string
  menuItems: any[]
  top: number
  // position: {
  //   parentY: number
  //   parentX: number
  // }
}

export interface UiState {
  notifications: Notification[]
  dropdowns: DropDownOverlayProps[]
}
