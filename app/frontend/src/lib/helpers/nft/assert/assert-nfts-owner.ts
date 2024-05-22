import { assertNftOwner } from '@echo/frontend/lib/helpers/nft/assert/assert-nft-owner'
import type { Nft } from '@echo/model/types/nft'
import { forEach } from 'ramda'

export function assertNftsOwner(nfts: Nft[], username: string) {
  forEach((nft: Nft) => {
    assertNftOwner(nft, username)
  }, nfts)
}
