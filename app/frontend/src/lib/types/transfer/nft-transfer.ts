import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'

export interface NftTransfer {
  chain: ChainName
  contractAddress: Lowercase<HexString>
  from: Lowercase<HexString>
  to: Lowercase<HexString>
  tokenId: number
}
