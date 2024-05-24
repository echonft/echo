import type { Collection } from '@echo/model/types/collection'

export function collectionComparator(collectionA: Collection, collectionB: Collection): number {
  return collectionA.name.localeCompare(collectionB.name)
}
