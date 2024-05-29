import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'

export interface CollectionContractResponse {
  address: HexString
  chain: ChainName
}
