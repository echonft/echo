import type { WithChainRequest } from '@echo/nft-scan/types/request/with-chain-request'
import type { WithFetchRequest } from '@echo/nft-scan/types/request/with-fetch-request'
import type { HexString } from '@echo/utils/types/hex-string'

export interface GetCollectionRequest extends WithFetchRequest, WithChainRequest {
  contractAddress: Lowercase<HexString>
  showAttribute?: boolean // To fetch all NFTs attributes. Default: false
}
