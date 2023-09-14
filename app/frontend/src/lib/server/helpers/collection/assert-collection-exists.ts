import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import { NotFoundError } from '@server/helpers/error/not-found-error'
import { isNil } from 'ramda'

export function assertCollectionExists(
  slug: string,
  collection: Partial<FirestoreNftCollection> | undefined
): asserts collection is NonNullable<Partial<FirestoreNftCollection>> {
  if (isNil(collection)) {
    throw new NotFoundError(`collection with slug ${slug} does not exist`)
  }
}
