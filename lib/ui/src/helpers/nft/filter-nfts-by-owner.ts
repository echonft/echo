import type { Nft } from '@echo/ui/types/model/nft'
import { User } from '@echo/ui/types/model/user'
import { filter, isNil, pathEq } from 'ramda'

export function filterNftsByOwner(nfts: Nft[], owner: User | undefined) {
  if (isNil(owner)) {
    return nfts
  }
  return filter(pathEq(owner.id, ['owner', 'id']), nfts)
}
