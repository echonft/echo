import { RequestWithPaging } from './request-with-paging'
import { QueryType } from '@echo/utils'

export interface GetOwnersForNftRequest extends QueryType, RequestWithPaging {
  contractAddress: string
  tokenId: number
}
