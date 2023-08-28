import { OfferState } from '@echo/ui-model'

export const isOfferModalDeclineButtonDisplayed = (state: OfferState) => state === 'OPEN' || state === 'ACCEPTED'
