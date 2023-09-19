import { getOfferItemsWallet } from '@echo/ui/helpers/offer/get-offer-items-wallet'
import type { Offer } from '@echo/ui/types/model/offer'

export function getOfferReceiverWallet(offer: Offer) {
  return getOfferItemsWallet(offer.receiverItems)
}
