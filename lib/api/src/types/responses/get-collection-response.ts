import type { CollectionResponse } from '@echo/api/types/responses/model/collection-response'

export interface GetCollectionResponse {
  collection: Partial<CollectionResponse>
}
