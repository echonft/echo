import { NftResponse } from './model/nft-response'

export interface GetNftCollectionNftsResponse {
  nfts: Array<Partial<NftResponse>>
}
