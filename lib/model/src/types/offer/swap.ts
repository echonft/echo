import { OfferState } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer/offer'

export interface Swap extends Omit<Offer, 'state'> {
  state: OfferState.Completed
}
