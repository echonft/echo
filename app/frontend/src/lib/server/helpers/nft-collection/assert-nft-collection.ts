import { BadRequestError } from '../error/bad-request-error'
import { NftCollection } from '@echo/firestore-types'
import { isNil } from 'ramda'

export function assertNftCollection(
  nftCollection: Partial<NftCollection> | undefined
): asserts nftCollection is NonNullable<Partial<NftCollection>> {
  if (isNil(nftCollection)) {
    throw new BadRequestError('collection is nil')
  }
}
