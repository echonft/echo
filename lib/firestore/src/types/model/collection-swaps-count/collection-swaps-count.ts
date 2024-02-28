import type { WithId } from '@echo/model/types/with-id'

export interface CollectionSwapsCount extends WithId {
  collectionId: string
  swapsCount: number
}
