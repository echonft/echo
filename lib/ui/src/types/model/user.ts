import type { Wallet } from '@echo/ui/types/model/wallet'

export interface User {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  username: string
  wallet: Wallet
}
