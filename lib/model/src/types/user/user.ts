import type { UserDiscordProfile } from '@echo/model/types/user/user-discord-profile'
import { type Wallet } from '@echo/model/types/wallet'
import type { WithUsername } from '@echo/model/types/with-username'

export interface User extends WithUsername {
  discord: Omit<UserDiscordProfile, 'id' | 'discriminator'>
  wallet: Wallet
}

export type UserIndex = Pick<User, 'username' | 'wallet'>
