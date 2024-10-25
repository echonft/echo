import type { Nft } from '@echo/model/types/nft'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import type { Username } from '@echo/model/types/username'
import { pathEq } from 'ramda'

export function nftIsOwnedBy(username: Username) {
  return function (nft: Nft): nft is OwnedNft {
    return pathEq(username, ['owner', 'username'], nft)
  }
}
