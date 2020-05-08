export enum Endpoints {
  LOGIN = '/users/login',
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ApiError {
  message: string
  tip: string
}
