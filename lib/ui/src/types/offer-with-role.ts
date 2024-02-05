import { type Offer } from '@echo/model/types/offer'
import { type OfferRole } from '@echo/model/types/offer-role'
import type { Nullable } from '@echo/utils/types/nullable'

export interface OfferWithRole extends Offer {
  role: Nullable<OfferRole>
}
