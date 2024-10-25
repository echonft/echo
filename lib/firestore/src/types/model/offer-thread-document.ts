import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'

export interface OfferThreadDocument {
  offerId: string
  guild: {
    channelId: string
    id: string
    threadId: string
  }
  state: OfferThreadState
}
