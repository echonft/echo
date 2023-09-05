import { NftCollectionResponse } from './model/nft-collection-response'

export interface GetNftCollectionsResponse {
  collections: Array<Partial<NftCollectionResponse>>
}
