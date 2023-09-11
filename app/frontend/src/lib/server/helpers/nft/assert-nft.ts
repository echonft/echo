import type { Nft } from '@echo/firestore-types'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertNft(nft: Partial<Nft> | undefined): asserts nft is NonNullable<Partial<Nft>> {
  if (isNil(nft)) {
    throw new BadRequestError('nft is nil')
  }
}
