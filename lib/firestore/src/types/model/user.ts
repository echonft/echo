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
  nftsUpdatedAt: Dayjs
  nonce: string | undefined
  updatedAt: Dayjs
  wallets: Wallet[]
}
