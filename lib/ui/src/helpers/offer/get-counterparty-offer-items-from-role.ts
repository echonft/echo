import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type NonEmptyArray } from 'ramda'

// TODO ERC20 + ERC1155
export function getCounterpartyOfferItemsFromRole(_offer: OfferWithRole): NonEmptyArray<OwnedNft> {
  // return ifElse(isOfferRoleSender, prop('senderItems'), prop('receiverItems'))(offer)
  return [] as unknown as NonEmptyArray<OwnedNft>
}
