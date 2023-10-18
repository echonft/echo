import { type AlchemyRequestWithPaging } from '@echo/alchemy/types/request/alchemy-request-with-paging'
import { type QueryType } from '@echo/utils/types/query-type'

export interface GetOwnersForNftRequest extends QueryType, AlchemyRequestWithPaging {
  contractAddress: string
  tokenId: number
}
