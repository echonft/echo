import { Nft, User } from '@echo/ui-model'
import { filter, isNil, pathEq } from 'ramda'

export function filterNftsByOwner(nfts: Nft[], owner: User | undefined) {
  if (isNil(owner)) {
    return nfts
  }
  return filter(pathEq(owner.id, ['owner', 'id']), nfts)
}
