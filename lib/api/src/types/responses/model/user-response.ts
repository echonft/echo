import type { WalletResponse } from '@echo/api/types/responses/model/wallet-response'

export interface UserResponse {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  username: string
  wallet: WalletResponse
}
