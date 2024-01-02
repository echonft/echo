import type { Nft } from '@echo/model/types/nft'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { any, assoc, dissoc, isEmpty, map } from 'ramda'

export function removeItemsFromNftSelection(nfts: SelectableNft[], offerItems: OfferItem[]): Nft[] {
  if (isEmpty(nfts)) {
    return nfts
  }
  return map((nft: SelectableNft) => {
    if (any((offerItem) => offerItem.nft.id === nft.id, offerItems)) {
      return assoc('selected', true, nft)
    }
    return dissoc('selected', nft)
  }, nfts)
}
