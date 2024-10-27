import type { Chain } from '@echo/model/constants/chain'
import type { Address } from '@echo/model/types/address'
import type { Username } from '@echo/model/types/username'

export interface User {
  discord: {
    avatarUrl: string
    username: Username
    globalName?: string
  }
  username: Username
}

export type UserIndex = Pick<User, 'username'>

export interface UserWithWallet extends User {
  wallet: {
    address: Address
    chain?: Chain
  }
}
