export enum Endpoints {
  LOGIN = '/users/login',
}

export type ApiStatus = 'loading' | 'success' | 'error'

export interface ApiError {
  message: string
  tip: string
}
