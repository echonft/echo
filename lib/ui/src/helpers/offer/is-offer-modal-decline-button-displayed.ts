import type { OfferState } from '@echo/ui/types/model/offer-state'

export const isOfferModalDeclineButtonDisplayed = (state: OfferState) => state === 'OPEN' || state === 'ACCEPTED'
