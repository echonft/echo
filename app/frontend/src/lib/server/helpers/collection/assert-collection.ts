import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertCollection(
  collection: FirestoreNftCollection | undefined
): asserts collection is NonNullable<FirestoreNftCollection> {
  if (isNil(collection)) {
    throw new BadRequestError('collection is nil')
  }
}
