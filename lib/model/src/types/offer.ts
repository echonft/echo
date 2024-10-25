import type { OfferState } from '@echo/model/constants/offer-state'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { Slug } from '@echo/model/types/slug'
import type { HexString } from '@echo/utils/types/hex-string'

export interface Offer extends BaseOffer {
  idContract: Lowercase<HexString>
  locked: boolean
  slug: Slug
  state: OfferState
}
