import type { WithFetchRequest } from '@echo/opensea/types/request/with-fetch-request'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'

export interface GetContractRequest extends WithFetchRequest {
  address: Lowercase<HexString>
  chain: ChainName
}
