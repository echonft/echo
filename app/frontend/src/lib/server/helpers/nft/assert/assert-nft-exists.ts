import { NotFoundError } from '@echo/frontend/lib/server/helpers/error/not-found-error'
import { type Nft } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export function assertNftExists(nft: Nft | undefined, slug: string, tokenId: string): asserts nft is NonNullable<Nft> {
  if (isNil(nft)) {
    throw new NotFoundError(`nft with token id ${tokenId} for collection with slug ${slug} not found`)
  }
}
