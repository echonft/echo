import type { Wallet } from '@echo/model/types/wallet'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface FetchCollectionRequest extends WithFetch {
  contract: Wallet
  showAttribute?: boolean // To fetch the collection attributes. Default: false
}
