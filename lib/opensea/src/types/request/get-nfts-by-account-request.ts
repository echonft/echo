import type { WithFetchRequest } from '@echo/opensea/types/request/with-fetch-request'
import type { HexString } from '@echo/utils/types/hex-string'

export interface GetNftsByAccountRequest extends WithFetchRequest {
  address: HexString
  chainId: number
  limit?: number // Must be between 1 and 200. Default: 50
  next?: string
}
