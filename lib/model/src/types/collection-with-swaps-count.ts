import type { Collection } from '@echo/model/types/collection'

export interface CollectionWithSwapsCount extends Collection {
  swapsCount: number
}
