import type { CollectionResponse } from '@echo/api/types/responses/model/collection-response'

export interface GetCollectionsResponse {
  collections: Array<Partial<CollectionResponse>>
}
