import type { AlchemyRequestWithPaging } from '@echo/alchemy/types/request/alchemy-request-with-paging'
import type { QueryType } from '@echo/utils/types/query-type'

export interface GetNftsForOwnerRequest extends AlchemyRequestWithPaging, QueryType {
  owner: string
  contractAddresses: string[] // max 45
}
