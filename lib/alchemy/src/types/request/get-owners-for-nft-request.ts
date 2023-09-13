import type { RequestWithPaging } from '@echo/alchemy/types/request/request-with-paging'
import type { QueryType } from '@echo/utils/types/query-type'

export interface GetOwnersForNftRequest extends QueryType, RequestWithPaging {
  contractAddress: string
  tokenId: number
}
