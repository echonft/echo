import { RequestWithPaging } from './request-with-paging'
import { QueryType } from '@echo/utils'

export interface GetNftsForOwnerRequest extends RequestWithPaging, QueryType {
  owner: string
  contractAddresses: string[] // max 45
}
