import type { Item } from '@echo/model/types/item'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { any, assoc, dissoc, isEmpty, map } from 'ramda'

export function unselectNftsFromItems(nfts: SelectableNft[], items: Item[]): SelectableNft[] {
  if (isEmpty(nfts)) {
    return nfts
  }
  return map((nft: SelectableNft) => {
    if (any((offerItem) => offerItem.nft.id === nft.id, items)) {
      return assoc('selected', true, nft)
    }
    return dissoc('selected', nft)
  }, nfts)
}
