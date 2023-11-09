import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'

export interface OfferStateUpdate extends OfferUpdate {
  update: {
    kind: 'state'
    args: OfferStateUpdateArgs
  }
}
