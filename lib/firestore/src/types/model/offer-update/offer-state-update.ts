import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import type { OfferState } from '@echo/model/types/offer-state'

export interface OfferStateUpdate extends OfferUpdate {
  update: {
    kind: 'state'
    args: {
      state: OfferState
    }
  }
}
