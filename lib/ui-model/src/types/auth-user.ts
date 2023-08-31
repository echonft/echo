import { Wallet } from './wallet'

export interface AuthUser {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordGuilds: {
    discordId: string
  }[]
  discordId: string
  discordUsername: string
  updatedAt: number
  wallets: Wallet[]
}
