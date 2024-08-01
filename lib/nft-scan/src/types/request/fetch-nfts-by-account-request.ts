import type { Wallet } from '@echo/model/types/wallet'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLogger } from '@echo/utils/types/with-logger'

export interface FetchNftsByAccountRequest extends WithFetch, WithLogger {
  wallet: Wallet
  showAttribute?: boolean // To fetch NFT attributes. Default: true
  limit?: number // Must be between 1 and 100. Default: 20
  next?: string
}
