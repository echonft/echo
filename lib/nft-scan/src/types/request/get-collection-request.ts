import type { Wallet } from '@echo/model/types/wallet'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetCollectionRequest extends WithFetch {
  contract: Wallet
  showAttribute?: boolean // To fetch all NFTs attributes. Default: false
}
