import { type Collection } from '@echo/model/types/collection'
import { isNil } from 'ramda'

export function guarded_assertCollectionExists(
  collection: Collection | undefined,
  slug: string
): asserts collection is NonNullable<Collection> {
  if (isNil(collection)) {
    throw new Error(`collection with slug ${slug} not found`)
  }
}
