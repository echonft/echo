import { UserDiscordGuild } from './user-discord-guild'
import { Wallet } from './wallet'
import { Dayjs } from 'dayjs'

export interface User {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordGuilds: UserDiscordGuild[]
  discordId: string
  discordUsername: string
  nftsUpdatedAt: Dayjs
  nonce?: string
  updatedAt: Dayjs
  wallets: Wallet[]
}
