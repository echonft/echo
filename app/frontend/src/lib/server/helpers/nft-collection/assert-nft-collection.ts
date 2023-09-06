import { NotFoundError } from '../error/not-found-error'
import { NftCollection } from '@echo/firestore-types'
import { isNil } from 'ramda'

export function assertNftCollection(
  nftCollection: Partial<NftCollection> | undefined
): asserts nftCollection is NonNullable<Partial<NftCollection>> {
  if (isNil(nftCollection)) {
    throw new NotFoundError()
  }
}
