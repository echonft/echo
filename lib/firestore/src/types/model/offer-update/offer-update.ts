import type { OfferUpdateKind } from '@echo/firestore/types/model/offer-update/offer-update-kind'

export interface OfferUpdate {
  offerId: string
  update: {
    kind: OfferUpdateKind
    args: object
  }
  createdAt: number
}
