import type { OfferRole } from '@echo/model/constants/offer-role'
import type { Swap } from '@echo/model/types/swap'
import type { Nullable } from '@echo/utils/types/nullable'

export interface SwapWithRole extends Swap {
  role: Nullable<OfferRole>
}
