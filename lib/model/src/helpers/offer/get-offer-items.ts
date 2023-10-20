import { type Offer } from '@echo/model/types/offer'
import { type OfferItem } from '@echo/model/types/offer-item'
import { concat, converge, prop } from 'ramda'

export function getOfferItems(offer: Offer): OfferItem[] {
  return converge(concat, [prop('receiverItems'), prop('senderItems')])(offer)
}
