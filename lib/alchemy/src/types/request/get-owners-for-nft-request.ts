import { RequestWithPaging } from './request-with-paging'

export interface GetOwnersForNftRequest extends RequestWithPaging {
  contractAddress: string
  tokenId: number
}
