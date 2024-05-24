import type { Nft } from '@echo/model/types/nft'
import { type Offer } from '@echo/model/types/offer'
import { concat } from 'ramda'

export function getOfferItems<T extends Pick<Offer, 'receiverItems' | 'senderItems'>>(offer: T): Nft[] {
  return concat(offer.receiverItems, offer.senderItems)
}
