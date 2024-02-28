import type { OfferUpdateKind } from '@echo/firestore/types/model/offer-update/offer-update-kind'
import type { WithId } from '@echo/model/types/with-id'

export interface OfferUpdate extends WithId {
  offerId: string
  update: {
    kind: OfferUpdateKind
    args: object
  }
  createdAt: number
}
