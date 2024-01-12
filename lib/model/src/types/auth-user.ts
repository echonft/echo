import type { Wallet } from '@echo/model/types/wallet'

export interface AuthUser {
  username: string
  discord: {
    avatarUrl: string
    avatarDecorationUrl?: string
    bannerColor: string
    bannerUrl?: string
    id: string
    username: string
  }
  wallets?: Wallet[]
}
