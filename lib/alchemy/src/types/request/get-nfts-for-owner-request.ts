import { RequestWithPaging } from './request-with-paging'

export interface GetNftsForOwnerRequest
  extends RequestWithPaging,
    Record<string, string | number | string[] | undefined> {
  owner: string
  contractAddresses: string[] // max 45
}
