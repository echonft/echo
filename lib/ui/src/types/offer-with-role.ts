import { type Offer } from '@echo/model/types/offer'
import { type OfferRole } from '@echo/model/types/offer-role'

export interface OfferWithRole extends Offer {
  role: OfferRole | undefined
}
