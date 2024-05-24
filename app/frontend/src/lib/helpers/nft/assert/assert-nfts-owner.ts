import { assertNftOwner } from '@echo/frontend/lib/helpers/nft/assert/assert-nft-owner'
import type { Nft } from '@echo/model/types/nft'
import { forEach, partialRight } from 'ramda'

export function assertNftsOwner(nfts: Nft[], username: string) {
  forEach(partialRight(assertNftOwner, [username]), nfts)
}
