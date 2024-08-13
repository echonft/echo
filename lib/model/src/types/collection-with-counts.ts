import type { CollectionWithSwapsCount } from '@echo/model/types/collection-with-swaps-count'

export interface CollectionWithCounts extends CollectionWithSwapsCount {
  readonly listingsCount: number
  readonly nftsCount: number
  readonly offersCount: number
}
