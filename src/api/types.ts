export enum Endpoints {
  LOGIN = '/login',
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

export type FieldError = { field: string; message: string }

export interface ApiError {
  message: string
  description: string | FieldError[]
}
