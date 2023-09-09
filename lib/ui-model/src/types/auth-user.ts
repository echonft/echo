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
  nftsUpdatedAt: number
  updatedAt: number
  username: string
  wallets: Wallet[]
}
