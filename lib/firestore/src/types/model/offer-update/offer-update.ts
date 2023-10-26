import type { OfferUpdateKind } from '@echo/firestore/types/model/offer-update/offer-update-kind'

export interface OfferUpdate {
  id: string
  offerId: string
  update: {
    kind: OfferUpdateKind
    args: object
  }
  postedAt: number
}
