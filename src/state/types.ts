export type StateStatus = 'loading' | 'success' | 'error'

export interface StateError {
  message: string
  tip?: string
}
