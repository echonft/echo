import { RequestWithPaging } from './request-with-paging'

export interface GetNftsForOwnerRequest extends RequestWithPaging {
  owner: string
  contractAddresses: string[] // max 45
}
