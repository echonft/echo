import type { Nft } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { pathEq } from 'ramda'

export function nftIsOwnedBy(username: string) {
  return function (nft: Nft): nft is OwnedNft {
    return pathEq(username, ['owner', 'username'], nft)
  }
}
