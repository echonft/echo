import { OfferUpdateKind } from '@echo/firestore/constants/offer-update-kind'
import type { OfferState } from '@echo/model/types/offer/offer-state'

export interface OfferUpdateDocumentData {
  offerId: string
  update: {
    kind: OfferUpdateKind
    args: object
  }
}

export interface OfferStateUpdateDocumentData extends OfferUpdateDocumentData {
  update: {
    kind: OfferUpdateKind.State
    args: {
      state: OfferState
      reason?: string
    }
  }
}
