import type { CollectionIndex } from '@echo/model/types/collection'
import type { Strict } from '@echo/utils/types/strict'

export interface ListingTargetRequest {
  quantity: number
  collection: Strict<CollectionIndex, CollectionIndex>
}
