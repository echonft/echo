import type { BaseOffer } from '@echo/model/types/base-offer'
import type { OfferState } from '@echo/model/types/offer-state'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { HexString } from '@echo/utils/types/hex-string'

export interface Offer extends WithSlug, BaseOffer {
  readOnly: boolean
  idContract: Lowercase<HexString>
  state: OfferState
}
