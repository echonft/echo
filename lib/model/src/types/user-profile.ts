import type { UserDiscordProfile } from '@echo/model/types/user'
import { type Wallet } from '@echo/model/types/wallet'
import type { WithCounts } from '@echo/model/types/with-counts'
import type { WithUsername } from '@echo/model/types/with-username'

export interface UserProfile extends WithUsername, WithCounts {
  discord: UserDiscordProfile
  wallets: Wallet[]
}
