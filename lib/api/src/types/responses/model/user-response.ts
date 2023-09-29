import type { WalletResponse } from '@echo/api/types/responses/model/wallet-response'

export interface UserResponse {
  discord: {
    avatarUrl: string
    avatarDecorationUrl?: string
    bannerColor: string
    bannerUrl?: string
    username: string
  }
  username: string
  wallets: WalletResponse[]
}
