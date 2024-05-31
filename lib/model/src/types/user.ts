import type { DiscordProfile } from '@echo/model/types/discord-profile'
import { type Wallet } from '@echo/model/types/wallet'
import type { WithUsername } from '@echo/model/types/with-username'

export interface User extends WithUsername {
  discord: Omit<DiscordProfile, 'id' | 'discriminator'>
  wallet: Wallet
}
