import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertNft(nft: FirestoreNft | undefined): asserts nft is NonNullable<FirestoreNft> {
  if (isNil(nft)) {
    throw new BadRequestError('nft is nil')
  }
}
