import { NftResponse } from './nft-response'
import { ResponseWithPaging } from './response-with-paging'

export interface GetNftsForOwnerResponse extends ResponseWithPaging {
  ownedNfts: NftResponse[]
}
