import type { Wallet } from '@echo/model/types/wallet'
import type { BaseRequest } from '@echo/nft-scan/types/request/base-request'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetCollectionRequest extends WithFetch, BaseRequest {
  contract: Wallet
  showAttribute?: boolean // To fetch the collection attributes. Default: false
}
