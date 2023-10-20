import { type OfferState } from '@echo/model/types/offer-state'

export const isOfferModalDeclineButtonDisplayed = (state: OfferState) => state === 'OPEN' || state === 'ACCEPTED'
