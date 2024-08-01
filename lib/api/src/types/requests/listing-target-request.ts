import type { CollectionIndex } from '@echo/model/types/collection'
import type { Strict } from '@echo/utils/types/strict'

export interface ListingTargetRequest {
  amount: number
  collection: Strict<CollectionIndex, CollectionIndex>
}
