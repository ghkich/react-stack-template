export enum Endpoints {
  LOGIN = '/login',
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ApiError {
  message: string
  tip: string
}
