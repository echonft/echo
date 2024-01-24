import { OFFER_ROLE_RECEIVER } from '@echo/model/constants/offer-role'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { OfferRole } from '@echo/model/types/offer-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { ifElse, prop, propEq } from 'ramda'

export function getCounterpartyOfferItemsFromRole(offer: OfferWithRole): OfferItem[] {
  return ifElse<[OfferWithRole], OfferItem[], OfferItem[]>(
    propEq<OfferRole, 'role'>(OFFER_ROLE_RECEIVER, 'role'),
    prop('senderItems'),
    prop('receiverItems')
  )(offer)
}
