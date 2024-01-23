import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { type Collection } from '@echo/model/types/collection'
import { isNil } from 'ramda'

export function guarded_assertCollectionExists(
  collection: Collection | undefined,
  slug: string
): asserts collection is NonNullable<Collection> {
  if (isNil(collection)) {
    throw new NotFoundError(`collection with slug ${slug} not found`)
  }
}
