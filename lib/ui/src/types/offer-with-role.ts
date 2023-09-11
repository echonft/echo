import type { OfferRole } from './offer-role'
import type { Offer } from '@echo/ui-model'

export interface OfferWithRole extends Offer {
  role: OfferRole
}
