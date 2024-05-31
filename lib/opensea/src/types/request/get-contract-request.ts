import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetContractRequest extends WithFetch {
  address: Lowercase<HexString>
  chain: ChainName
}
