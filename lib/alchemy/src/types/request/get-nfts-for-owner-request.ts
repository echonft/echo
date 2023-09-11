import type { QueryType } from '@echo/utils'
import type { RequestWithPaging } from '@echo-alchemy/types/request/request-with-paging'

export interface GetNftsForOwnerRequest extends RequestWithPaging, QueryType {
  owner: string
  contractAddresses: string[] // max 45
}
