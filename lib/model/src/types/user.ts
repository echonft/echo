import type { Address } from '@echo/model/types/address'

export interface User {
  discord: {
    avatarUrl: string
    username: string
    globalName?: string
  }
  username: string
  wallet: Address
}

export type UserIndex = Pick<User, 'username'>
