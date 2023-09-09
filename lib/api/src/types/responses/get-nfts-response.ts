import { NftResponse } from './model/nft-response'

export interface GetNftsResponse {
  nfts: Array<Partial<NftResponse>>
}
