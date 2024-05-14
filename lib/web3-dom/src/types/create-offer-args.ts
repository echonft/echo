import type { Offer } from '@echo/model/types/offer'

// TODO Add value once we turn the fee switch on
export interface CreateOfferArgs {
  chainId: number
  offer: Offer
}
