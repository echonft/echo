import type { Collection } from '@echo/model/types/collection'

export function compareCollections(collectionA: Collection, collectionB: Collection): number {
  return collectionA.name.localeCompare(collectionB.name)
}
