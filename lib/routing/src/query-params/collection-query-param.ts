import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import type { CollectionIndex } from '@echo/model/types/collection'

export function collectionQueryParam(collection: CollectionIndex): string {
  return serializeCollection(collection)
}
