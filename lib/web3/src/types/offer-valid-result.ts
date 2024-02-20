import type { Offer } from '@echo/model/types/offer'

export interface OfferValidResult {
  offer: Offer
  error?: string
}
