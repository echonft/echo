import type { OfferStateUpdateTriggerReason } from '@echo/firestore/types/model/offer-update/offer-state-update-trigger-reason'
import type { OfferState } from '@echo/model/types/offer-state'

export interface OfferStateUpdateArgs {
  state: OfferState
  trigger: {
    by: string
    reason?: OfferStateUpdateTriggerReason
  }
}
