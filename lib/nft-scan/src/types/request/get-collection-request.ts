import type { WithChainRequest } from '@echo/nft-scan/types/request/with-chain-request'
import type { HexString } from '@echo/utils/types/hex-string'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetCollectionRequest extends WithFetch, WithChainRequest {
  contractAddress: Lowercase<HexString>
  showAttribute?: boolean // To fetch all NFTs attributes. Default: false
}
