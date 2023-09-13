import type { RequestWithPaging } from '@echo/alchemy/types/request/request-with-paging'
import type { QueryType } from '@echo/utils/types/query-type'

export interface GetNftsForOwnerRequest extends RequestWithPaging, QueryType {
  owner: string
  contractAddresses: string[] // max 45
}
