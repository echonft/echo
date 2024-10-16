import type { CollectionWithSwapsCount } from '@echo/model/types/collection/collection-with-swaps-count'

export interface CollectionWithRank extends CollectionWithSwapsCount {
  rank: number
}
