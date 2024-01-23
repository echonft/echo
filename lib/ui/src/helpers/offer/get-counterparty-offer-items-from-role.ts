import { OFFER_ROLE_RECEIVER } from '@echo/model/constants/offer-role'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { equals, ifElse, pipe, prop } from 'ramda'

export function getCounterpartyOfferItemsFromRole(offer: OfferWithRole): OfferItem[] {
  return ifElse<[OfferWithRole], OfferItem[], OfferItem[]>(
    pipe(prop('role'), equals(OFFER_ROLE_RECEIVER)),
    prop('senderItems'),
    prop('receiverItems')
  )(offer)
}
