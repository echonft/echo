import { Wallet } from './wallet'

export interface UserDetails {
  id: string
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordId: string
  discordUsername: string
  wallet: Wallet
}
