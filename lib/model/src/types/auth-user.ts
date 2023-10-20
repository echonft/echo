import { type Wallet } from '@echo/model/types/wallet'

export interface AuthUser {
  id: string
  username: string
  discord: {
    avatarUrl: string
    avatarDecorationUrl?: string
    bannerColor: string
    bannerUrl?: string
    id: string
    username: string
  }
  sessionToken: string
  updatedAt: number
  wallets: Wallet[]
}
