import type { Nft } from '@echo/model/types/nft'
import { isOfferRoleSender } from '@echo/ui/helpers/offer/is-offer-role-sender'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { ifElse, prop } from 'ramda'

export function getCounterpartyOfferItemsFromRole(offer: OfferWithRole): Nft[] {
  return ifElse(isOfferRoleSender, prop('senderItems'), prop('receiverItems'))(offer)
}
