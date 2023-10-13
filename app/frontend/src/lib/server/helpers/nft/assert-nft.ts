import type { Nft } from '@echo/model/types/nft'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertNft(nft: Nft | undefined): asserts nft is NonNullable<Nft> {
  if (isNil(nft)) {
    throw new BadRequestError('nft is nil')
  }
}
