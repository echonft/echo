import type { UserResponse } from '@echo/api/types/responses/model/user-response'
import type { WalletResponse } from '@echo/api/types/responses/model/wallet-response'

export interface UserDetailsResponse extends Omit<UserResponse, 'wallets'> {
  wallet: WalletResponse
}
