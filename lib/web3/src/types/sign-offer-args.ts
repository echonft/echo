import type { Offer } from '@echo/model/types/offer'

// TODO This is a duplicate, not sure where it should be
export interface SignOfferArgs {
  chainId: number
  offer: Offer
}
