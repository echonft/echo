import type { OfferItem } from '@echo/model/types/offer-item'
import { unselectNftsFromItems } from '@echo/ui/helpers/nft/unselect-nfts-from-items'
import type { Group } from '@echo/ui/types/group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isEmpty, map } from 'ramda'

export function unselectNftGroupsFromItems(
  nftsGroup: Group<SelectableNft>[],
  offerItems: OfferItem[]
): Group<SelectableNft>[] {
  if (isEmpty(nftsGroup)) {
    return nftsGroup
  }
  return map((group: Group<SelectableNft>) => {
    return { ...group, items: unselectNftsFromItems(group.items, offerItems) }
  }, nftsGroup)
}
