import type { WalletResponse } from '@echo/api/types/responses/model/wallet-response'

export interface UserDetailsResponse {
  discord: {
    avatarUrl: string
    username: string
  }
  username: string
  wallet: WalletResponse
}
