import type { Offer } from '@echo/ui/types/model/offer'
import type { OfferRole } from '@echo/ui/types/offer-role'

export interface OfferWithRole extends Offer {
  role: OfferRole
}
