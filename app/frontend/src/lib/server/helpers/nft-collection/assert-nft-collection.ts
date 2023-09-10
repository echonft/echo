import { BadRequestError } from '../error/bad-request-error'
import { NftCollection } from '@echo/firestore-types'
import { isNil } from 'ramda'

export function assertNftCollection(
  collection: Partial<NftCollection> | undefined
): asserts collection is NonNullable<Partial<NftCollection>> {
  if (isNil(collection)) {
    throw new BadRequestError('collection is nil')
  }
}
