import type { CollectionWithSwapsCount } from '@echo/model/types/collection'

export interface CollectionWithRank extends CollectionWithSwapsCount {
  rank: number
}
