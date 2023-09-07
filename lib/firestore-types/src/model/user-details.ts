import { Wallet } from './wallet'

export interface UserDetails {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  username: string
  wallet: Wallet
}
