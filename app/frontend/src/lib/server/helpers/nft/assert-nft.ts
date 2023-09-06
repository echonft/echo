import { NotFoundError } from '../error/not-found-error'
import { Nft } from '@echo/firestore-types'
import { isNil } from 'ramda'

export function assertNft(nft: Partial<Nft> | undefined): asserts nft is NonNullable<Partial<Nft>> {
  if (isNil(nft)) {
    throw new NotFoundError()
  }
}
