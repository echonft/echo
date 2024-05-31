import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetNftsByAccountRequest extends WithFetch {
  address: HexString
  chain: ChainName
  limit?: number // Must be between 1 and 200. Default: 50
  next?: string
}
