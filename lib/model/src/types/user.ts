import type { DiscordProfile } from '@echo/model/types/discord-profile'
import { type Wallet } from '@echo/model/types/wallet'
import type { WithUsername } from '@echo/model/types/with-username'
import type { Strict } from '@echo/utils/types/strict'

export type UserDiscordProfile = Omit<DiscordProfile, 'id' | 'discriminator'>

export interface User extends WithUsername {
  discord: Strict<UserDiscordProfile, UserDiscordProfile>
  wallet: Wallet
}
