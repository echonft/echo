import type { Collection, CollectionIndex } from '@echo/model/types/collection/collection'
import { pick } from 'ramda'

export function collectionIndex<T extends Collection>(
  collection: Partial<T> & Required<CollectionIndex>
): CollectionIndex {
  return pick(['slug'], collection)
}
