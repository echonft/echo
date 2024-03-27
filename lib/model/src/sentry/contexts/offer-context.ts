import type { Offer } from '@echo/model/types/offer'

export const OFFER_CONTEXT_NAME = 'offer'
export function offerContext(offer: Partial<Offer>) {
  return {
    [OFFER_CONTEXT_NAME]: offer
  }
}
