import type { Wallet } from '@echo/model/types/wallet'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetContractRequest extends WithFetch {
  contract: Wallet
}
