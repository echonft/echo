import type { NftCollection } from '@echo/firestore-types'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertNftCollection(
  collection: Partial<NftCollection> | undefined
): asserts collection is NonNullable<Partial<NftCollection>> {
  if (isNil(collection)) {
    throw new BadRequestError('collection is nil')
  }
}
