import { RequestWithPaging } from './request-with-paging'

export interface GetOwnersForNftRequest
  extends Record<string, string | number | string[] | undefined>,
    RequestWithPaging {
  contractAddress: string
  tokenId: number
}
