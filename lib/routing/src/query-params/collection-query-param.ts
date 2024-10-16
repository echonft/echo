import type { CollectionIndex } from '@echo/model/types/collection/collection'

export function collectionQueryParam(collection: CollectionIndex): string {
  return collection.slug
}
