import type { Collection } from '@echo/model/types/collection'

export interface CollectionWithRank extends Collection {
  rank: number
}
