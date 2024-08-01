import type { CollectionIndex } from '@echo/model/types/collection'

export function collectionQueryParam(collection: CollectionIndex): string {
  return collection.slug
}
