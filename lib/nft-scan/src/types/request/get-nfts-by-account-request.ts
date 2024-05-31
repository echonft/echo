import type { WithChainRequest } from '@echo/nft-scan/types/request/with-chain-request'
import type { WithFetchRequest } from '@echo/nft-scan/types/request/with-fetch-request'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'

export interface GetNftsByAccountRequest extends WithFetchRequest, WithChainRequest {
  accountAddress: HexString
  chain: ChainName
  ercType?: 'erc721' | 'erc1155'
  showAttribute?: boolean // To fetch NFT attributes. Default: true
  limit?: number // Must be between 1 and 100. Default: 20
  next?: string
}
