import type { Collection } from '@echo/model/types/collection'
import type { Slug } from '@echo/model/types/slug'

export function serializeCollection<T extends Pick<Collection, 'slug'>>(collection: T): Slug {
  return collection.slug
}
