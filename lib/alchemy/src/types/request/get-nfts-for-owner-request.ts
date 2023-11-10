import { type AlchemyRequestWithPaging } from '@echo/alchemy/types/request/alchemy-request-with-paging'
import type { HexString } from '@echo/utils/types/hex-string'

export interface GetNftsForOwnerRequest extends AlchemyRequestWithPaging {
  owner: HexString
  contractAddresses: HexString[] // max 45
}
