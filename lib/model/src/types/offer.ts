import type { BaseOffer } from '@echo/model/types/base-offer'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { HexString } from '@echo/utils/types/hex-string'

export interface Offer extends WithSlug, BaseOffer {
  createdAt: number
  readOnly: boolean
  updatedAt: number
  idContract: HexString
}
