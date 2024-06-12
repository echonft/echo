import type { Wallet } from '@echo/model/types/wallet'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLogger } from '@echo/utils/types/with-logger'

export interface GetAllNftsByAccountRequest extends WithFetch, WithLogger {
  showAttribute?: boolean
  wallet: Wallet
}
