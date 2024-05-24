import type { Collection } from '@echo/model/types/collection'

export interface ListingTargetRequest {
  amount: number
  collection: Pick<Collection, 'slug'>
}
