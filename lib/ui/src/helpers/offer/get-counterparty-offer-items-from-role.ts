import type { OfferItem } from '@echo/model/types/offer-item'
import { isOfferRoleSender } from '@echo/ui/helpers/offer/is-offer-role-sender'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { ifElse, prop } from 'ramda'

export function getCounterpartyOfferItemsFromRole(offer: OfferWithRole): OfferItem[] {
  return ifElse(isOfferRoleSender, prop('senderItems'), prop('receiverItems'))(offer)
}
