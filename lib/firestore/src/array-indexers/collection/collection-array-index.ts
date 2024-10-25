import type { ArrayIndex } from '@echo/firestore/types/array-index'
import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import type { CollectionIndex } from '@echo/model/types/collection'

export function collectionArrayIndex(collection: CollectionIndex): ArrayIndex {
  return serializeCollection(collection)
}
