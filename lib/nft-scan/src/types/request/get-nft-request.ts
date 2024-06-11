import type { Wallet } from '@echo/model/types/wallet'
import type { BaseRequest } from '@echo/nft-scan/types/request/base-request'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetNftRequest extends WithFetch, BaseRequest {
  contract: Wallet
  identifier: string
  showAttribute?: boolean // To fetch NFT attributes. Default: true
}
