import type { Item } from '@echo/model/types/item'
import { unselectNftsFromItems } from '@echo/ui/helpers/nft/unselect-nfts-from-items'
import type { NftGroup } from '@echo/ui/types/nft-group'
import { isEmpty, map } from 'ramda'

export function unselectNftGroupsFromItems(nftsGroup: NftGroup[], items: Item[]): NftGroup[] {
  if (isEmpty(nftsGroup)) {
    return nftsGroup
  }
  return map((group: NftGroup) => {
    return { ...group, nfts: unselectNftsFromItems(group.nfts, items) }
  }, nftsGroup)
}
