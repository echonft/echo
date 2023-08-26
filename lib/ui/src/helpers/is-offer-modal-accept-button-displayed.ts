import { OfferState } from '@echo/ui-model'

export const isOfferModalAcceptButtonDisplayed = (state: OfferState) => state === 'OPEN' || state === 'ACCEPTED'
