import type { Collection } from '@echo/model/types/collection'

export function serializeCollection<T extends Pick<Collection, 'slug'>>(collection: T): Lowercase<string> {
  return collection.slug
}
