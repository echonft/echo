import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { WithLogger } from '@echo/utils/types/with-logger'

export interface EscrowData extends WithLogger {
  from: HexString
  to: HexString
  tokenId: number
  contractAddress: Lowercase<HexString>
  chain: ChainName
}
