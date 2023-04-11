import { DiscordGuild } from './discord-guild'
import { Wallet } from './wallet'

export interface User {
  id: string
  discordId: string
  discordUsername: string
  discordGuilds: DiscordGuild[]
  discordAvatar: string | undefined
  discordBanner: string | undefined
  wallets: Wallet[] | undefined
}
