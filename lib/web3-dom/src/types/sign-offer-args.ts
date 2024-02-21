import type { Offer } from '@echo/model/types/offer'

export interface SignOfferArgs {
  chainId: number
  offer: Offer
}
