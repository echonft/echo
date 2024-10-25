import type { Counts } from '@echo/model/types/counts'
import type { User } from '@echo/model/types/user'
import { type Wallet } from '@echo/model/types/wallet'

export interface UserProfile extends Omit<User, 'wallet'>, Counts {
  wallets: Wallet[]
}
