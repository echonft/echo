import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'

export interface EscrowData {
  from: HexString
  to: HexString
  tokenId: number
  contractAddress: Lowercase<HexString>
  chain: ChainName
}
