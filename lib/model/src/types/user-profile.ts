import type { Wallet } from '@echo/model/types/wallet'

export interface UserProfile {
  discord: {
    avatarUrl: string
    avatarDecorationUrl?: string
    bannerColor: string
    bannerUrl?: string
    username: string
  }
  username: string
  wallets: Wallet[]
}
