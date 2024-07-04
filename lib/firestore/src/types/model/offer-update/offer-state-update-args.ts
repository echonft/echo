import type { OfferState } from '@echo/model/types/offer-state'

export interface OfferStateUpdateArgs {
  state: OfferState
  reason?: string
}
