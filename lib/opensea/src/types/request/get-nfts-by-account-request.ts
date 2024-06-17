import type { Wallet } from '@echo/model/types/wallet'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetNftsByAccountRequest extends WithFetch {
  wallet: Wallet
  limit?: number // Must be between 1 and 200. Default: 50
  next?: string
}
