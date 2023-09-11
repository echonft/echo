import type { QueryType } from '@echo/utils'
import { RequestWithPaging } from '@echo-alchemy/types/request/request-with-paging'

export interface GetOwnersForNftRequest extends QueryType, RequestWithPaging {
  contractAddress: string
  tokenId: number
}
