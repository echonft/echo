import { type OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { OFFER_MOCK_FROM_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'

export const offerThreadMock: Record<string, OfferThread> = {
  hot4VWDzd6ZRsC3nsvnb: {
    offerId: OFFER_MOCK_FROM_JOHNNYCAGE_ID,
    guild: {
      id: '100',
      channelId: '10',
      threadId: '1'
    },
    postedAt: 1676984897,
    state: 'ACTIVE'
  }
}
