import type { Collection } from '@echo/model/types/collection'

export interface CollectionWithSwapsCount extends Collection {
  readonly swapsCount: number
}
