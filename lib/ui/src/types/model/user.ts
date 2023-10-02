import type { Wallet } from '@echo/ui/types/model/wallet'

export interface User {
  discord: {
    avatarUrl: string
    username: string
  }
  username: string
  wallet: Wallet
}
