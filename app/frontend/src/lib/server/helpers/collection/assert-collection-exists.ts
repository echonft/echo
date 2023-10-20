import { NotFoundError } from '@echo/frontend/lib/server/helpers/error/not-found-error'
import { type Collection } from '@echo/model/types/collection'
import { isNil } from 'ramda'

export function assertCollectionExists(
  slug: string,
  collection: Collection | undefined
): asserts collection is NonNullable<Collection> {
  if (isNil(collection)) {
    throw new NotFoundError(`collection with slug ${slug} does not exist`)
  }
}
