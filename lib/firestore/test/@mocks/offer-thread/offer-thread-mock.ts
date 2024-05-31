import { type OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { offerMockFromJohnnycageId } from '@echo/model-mocks/offer/offer-mock'

export function offerThreadMock(): Record<string, OfferThread> {
  return {
    hot4VWDzd6ZRsC3nsvnb: {
      offerId: offerMockFromJohnnycageId(),
      guild: {
        id: '100',
        channelId: '10',
        threadId: '1'
      },
      postedAt: 1676984897,
      state: 'ACTIVE'
    }
  }
}
