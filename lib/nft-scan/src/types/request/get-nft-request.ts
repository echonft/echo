import type { WithChainRequest } from '@echo/nft-scan/types/request/with-chain-request'
import type { HexString } from '@echo/utils/types/hex-string'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetNftRequest extends WithFetch, WithChainRequest {
  contract: HexString
  identifier: string
  showAttribute?: boolean // To fetch NFT attributes. Default: true
}
