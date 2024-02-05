import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { type Nft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function guarded_assertNftExists(
  nft: Nullable<Nft>,
  slug: string,
  tokenId: string
): asserts nft is NonNullable<Nft> {
  if (isNil(nft)) {
    throw new NotFoundError(`nft with token id ${tokenId} for collection with slug ${slug} not found`)
  }
}
