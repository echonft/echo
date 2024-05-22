import type { Nft } from '@echo/model/types/nft'
import { type Offer } from '@echo/model/types/offer'
import { concat, converge, prop } from 'ramda'

export function getOfferItems(offer: Offer): Nft[] {
  return converge(concat, [prop('receiverItems'), prop('senderItems')])(offer)
}
