import type { WithChainRequest } from '@echo/nft-scan/types/request/with-chain-request'
import type { WithFetchRequest } from '@echo/nft-scan/types/request/with-fetch-request'
import type { HexString } from '@echo/utils/types/hex-string'

export interface GetNftRequest extends WithFetchRequest, WithChainRequest {
  contract: HexString
  identifier: string
  showAttribute?: boolean // To fetch NFT attributes. Default: true
}
