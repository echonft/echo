import { OfferUpdateKind } from '@echo/firestore/constants/offer/offer-update-kind'
import type { OfferState } from '@echo/model/types/offer-state'

export interface OfferUpdateDocumentData {
  offerId: string
  update: {
    kind: OfferUpdateKind
    args: object
  }
}

export interface OfferStateUpdateDocumentData extends OfferUpdateDocumentData {
  update: {
    kind: OfferUpdateKind.STATE
    args: {
      state: OfferState
      reason?: string
    }
  }
}
