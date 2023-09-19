import type { Wallet } from '@echo/ui/types/model/wallet'

export interface User {
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  username: string
  wallets?: Array<Wallet>
}
