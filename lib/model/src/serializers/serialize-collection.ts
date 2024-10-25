import type { CollectionIndex } from '@echo/model/types/collection'

export function serializeCollection(collection: CollectionIndex): string {
  return collection.slug
}
