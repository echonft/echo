import { User } from './user'

export interface Wallet {
  id: string
  chainId: string
  address: string
  user: User
}
