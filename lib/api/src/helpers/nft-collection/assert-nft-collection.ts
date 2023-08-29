import { BadRequestError } from '../error/bad-request-error'
import { NftCollection } from '@echo/firestore'
import { isNil } from 'ramda'

export function assertNftCollection(nftCollection: NftCollection | undefined) {
  if (isNil(nftCollection)) {
    throw new BadRequestError()
  }
}
