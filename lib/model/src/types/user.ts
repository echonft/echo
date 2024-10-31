import type { Username } from '@echo/model/types/username'
import type { Wallet } from '@echo/model/types/wallet'

export interface User {
  discord: {
    avatarUrl: string
    username: Username
    globalName?: string
  }
  username: Username
  wallet: Wallet
}

export type UserIndex = Pick<User, 'username'>
