import type { Address } from '@echo/model/types/address'
import type { Username } from '@echo/model/types/username'

export interface User {
  discord: {
    avatarUrl: string
    username: Username
    globalName?: string
  }
  username: Username
  wallet?: Address
}

export type UserIndex = Pick<User, 'username'>
