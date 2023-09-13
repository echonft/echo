import type { NftCollectionResponse } from '@echo/api/types/responses/model/nft-collection-response'

export interface GetNftCollectionResponse {
  collection: Partial<NftCollectionResponse>
}
