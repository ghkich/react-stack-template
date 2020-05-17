import {User} from '../users/types'

export interface AuthState extends User {
  access_token: string
}
