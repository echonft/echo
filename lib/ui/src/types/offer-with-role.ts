import type { OfferRole } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer/offer'
import type { Nullable } from '@echo/utils/types/nullable'

export interface OfferWithRole extends Offer {
  role: Nullable<OfferRole>
}
