import type { UserDiscordProfile } from '@echo/model/types/user'
import { type Wallet } from '@echo/model/types/wallet'
import type { WithCounts } from '@echo/model/types/with-counts'
import type { WithUsername } from '@echo/model/types/with-username'
import type { Strict } from '@echo/utils/types/strict'

export interface UserProfile extends WithUsername, WithCounts {
  discord: Strict<UserDiscordProfile, UserDiscordProfile>
  wallets: Wallet[]
}
