import type { Wallet } from '@echo/model/types/wallet'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetNftRequest extends WithFetch {
  contract: Wallet
  identifier: string
  showAttribute?: boolean // To fetch NFT attributes. Default: true
}
