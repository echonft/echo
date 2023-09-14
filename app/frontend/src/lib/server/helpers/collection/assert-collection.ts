import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertCollection(
  collection: Partial<FirestoreNftCollection> | undefined
): asserts collection is NonNullable<Partial<FirestoreNftCollection>> {
  if (isNil(collection)) {
    throw new BadRequestError('collection is nil')
  }
}
