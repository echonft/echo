import type { WithChainRequest } from '@echo/nft-scan/types/request/with-chain-request'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetNftsByAccountRequest extends WithFetch, WithChainRequest {
  accountAddress: HexString
  chain: ChainName
  ercType?: 'erc721' | 'erc1155'
  showAttribute?: boolean // To fetch NFT attributes. Default: true
  limit?: number // Must be between 1 and 100. Default: 20
  next?: string
}
