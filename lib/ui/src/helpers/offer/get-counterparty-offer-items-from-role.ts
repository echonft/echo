import type { OwnedNft } from '@echo/model/types/nft'
import { isOfferRoleSender } from '@echo/ui/helpers/offer/is-offer-role-sender'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { ifElse, type NonEmptyArray, prop } from 'ramda'

export function getCounterpartyOfferItemsFromRole(offer: OfferWithRole): NonEmptyArray<OwnedNft> {
  return ifElse(isOfferRoleSender, prop('senderItems'), prop('receiverItems'))(offer)
}
