import { DiscordGuild } from './discord-guild'
import { Wallet } from './wallet'
import { Dayjs } from 'dayjs'

export interface User {
  id: string
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordGuilds: Omit<DiscordGuild, 'channelId'>[]
  discordId: string
  discordUsername: string
  nonce: string | undefined
  updatedAt: Dayjs | undefined
  wallets: Wallet[]
}
