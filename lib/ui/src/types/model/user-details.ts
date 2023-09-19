import type { User } from '@echo/ui/types/model/user'
import type { Wallet } from '@echo/ui/types/model/wallet'

export interface UserDetails extends Omit<User, 'wallets'> {
  wallet: Wallet
}
