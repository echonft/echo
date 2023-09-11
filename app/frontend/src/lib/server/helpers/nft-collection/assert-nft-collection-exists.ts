import type { NftCollection } from '@echo/firestore-types'
import { NotFoundError } from '@server/helpers/error/not-found-error'
import { isNil } from 'ramda'

export function assertNftCollectionExists(
  slug: string,
  collection: Partial<NftCollection> | undefined
): asserts collection is NonNullable<Partial<NftCollection>> {
  if (isNil(collection)) {
    throw new NotFoundError(`collection with slug ${slug} does not exist`)
  }
}
