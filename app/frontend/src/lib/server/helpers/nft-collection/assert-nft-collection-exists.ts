import { NotFoundError } from '../error/not-found-error'
import { NftCollection } from '@echo/firestore-types'
import { isNil } from 'ramda'

export function assertNftCollectionExists(
  slug: string,
  collection: Partial<NftCollection> | undefined
): asserts collection is NonNullable<Partial<NftCollection>> {
  if (isNil(collection)) {
    throw new NotFoundError(`collection with slug ${slug} does not exist`)
  }
}
