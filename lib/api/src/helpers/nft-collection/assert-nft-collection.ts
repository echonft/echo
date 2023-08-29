import { NotFoundError } from '../error/not-found-error'
import { NftCollection } from '@echo/firestore'
import { isNil } from 'ramda'

export function assertNftCollection(nftCollection: NftCollection | undefined) {
  if (isNil(nftCollection)) {
    throw new NotFoundError()
  }
}
