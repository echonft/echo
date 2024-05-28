import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { filter, pathEq } from 'ramda'

export function filterNftsByOwner<T extends Nft>(owner: User): (nfts: T[]) => T[] {
  return function (nfts: T[]): T[] {
    return filter(pathEq(owner.username, ['owner', 'username']), nfts)
  }
}
