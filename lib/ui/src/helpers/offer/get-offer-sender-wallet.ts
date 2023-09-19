import { getOfferItemsWallet } from '@echo/ui/helpers/offer/get-offer-items-wallet'
import type { Offer } from '@echo/ui/types/model/offer'

export function getOfferSenderWallet(offer: Offer) {
  return getOfferItemsWallet(offer.senderItems)
}
