import type { Nft, OwnedNft } from '@echo/model/types/nft'
import { pathEq } from 'ramda'

export function nftIsOwnedBy(username: string) {
  return function (nft: Nft): nft is OwnedNft {
    return pathEq(username, ['owner', 'username'], nft)
  }
}
