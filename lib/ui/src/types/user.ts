import { DiscordGuild } from './discord-guild'
import { Wallet } from './wallet'
import dayjs from 'dayjs'

export interface User {
  id: string
  discordId: string
  discordUsername: string
  discordGuilds: DiscordGuild[]
  discordAvatar: string | undefined
  discordBanner: string | undefined
  wallets: Wallet[] | undefined
  updatedAt?: dayjs.Dayjs
}
