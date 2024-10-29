import type { User } from '@echo/model/types/user'
import type { Wallet } from '@echo/model/types/wallet'

export interface AuthUser extends User {
  wallets: Wallet[]
}
