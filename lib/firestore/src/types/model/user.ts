import { UserDiscordGuild } from './user-discord-guild'
import { Wallet } from './wallet'
import { Dayjs } from 'dayjs'

export interface User {
  id: string
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordGuilds: UserDiscordGuild[]
  discordId: string
  discordUsername: string
  nonce: string | undefined
  updatedAt: Dayjs
  wallets: Wallet[]
}
