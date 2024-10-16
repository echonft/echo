import type { Collection } from '@echo/model/types/collection/collection'

export interface CollectionWithSwapsCount extends Collection {
  readonly swapsCount: number
}
