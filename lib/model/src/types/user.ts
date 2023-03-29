import { DiscordGuild } from './discord-guild'
import { Wallet } from './wallet'

export interface User {
  id: string
  discordId: number
  discordUsername: string
  discordGuilds: DiscordGuild[]
  nonce: string | undefined
  wallets: Wallet[] | undefined
}
