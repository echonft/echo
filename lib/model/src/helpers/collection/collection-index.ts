import type { CollectionIndex } from '@echo/model/types/collection'
import { withSlugSchema } from '@echo/model/validators/slug-schema'

export function collectionIndex<T extends CollectionIndex>(collection: T): CollectionIndex {
  return withSlugSchema.parse(collection)
}
