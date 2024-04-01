import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { type Collection } from '@echo/model/types/collection'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function assertCollectionExists(
  collection: Nullable<Collection>,
  slug: string
): asserts collection is NonNullable<Collection> {
  if (isNil(collection)) {
    throw new NotFoundError(`collection with slug ${slug} not found`)
  }
}
