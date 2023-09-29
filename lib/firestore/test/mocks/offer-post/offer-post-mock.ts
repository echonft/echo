import type { FirestoreOfferPost } from '@echo/firestore/types/model/offer-post/firestore-offer-post'
import dayjs from 'dayjs'

export const offerPostMock: Record<string, FirestoreOfferPost> = {
  hot4VWDzd6ZRsC3nsvnb: {
    id: 'hot4VWDzd6ZRsC3nsvnb',
    offerId: 'ASkFpKoHEHVH0gd69t1G',
    guild: {
      discordId: '100',
      threadId: '1'
    },
    postedAt: dayjs.unix(1676984897)
  }
}
