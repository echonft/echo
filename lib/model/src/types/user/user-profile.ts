import type { User } from '@echo/model/types/user/user'
import { type Wallet } from '@echo/model/types/wallet'
import type { WithCounts } from '@echo/model/types/with-counts'

export interface UserProfile extends Omit<User, 'wallet'>, WithCounts {
  wallets: Wallet[]
}
