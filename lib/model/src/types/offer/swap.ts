import type { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer/offer'

export interface Swap extends Omit<Offer, 'state'> {
  state: typeof OFFER_STATE_COMPLETED
}
