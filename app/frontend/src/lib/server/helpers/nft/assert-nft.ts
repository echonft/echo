import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { type Nft } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export function assertNft(nft: Nft | undefined): asserts nft is NonNullable<Nft> {
  if (isNil(nft)) {
    throw new BadRequestError('nft is nil')
  }
}
