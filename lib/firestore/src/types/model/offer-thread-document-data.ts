import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'

export interface OfferThreadDocumentData {
  offerId: string
  guild: {
    channelId: string
    id: string
    threadId: string
  }
  state: OfferThreadState
}
