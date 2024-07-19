import type { PartialCollection } from '@echo/model/types/collection'

export function collectionQueryParam(collection: PartialCollection): string {
  return collection.slug
}
