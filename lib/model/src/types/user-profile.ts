import type { DiscordProfile } from '@echo/model/types/discord-profile'
import { type Wallet } from '@echo/model/types/wallet'
import type { WithUsername } from '@echo/model/types/with-username'

export interface UserProfile extends WithUsername {
  discord: Omit<DiscordProfile, 'id' | 'discriminator'>
  wallets: Wallet[]
}
