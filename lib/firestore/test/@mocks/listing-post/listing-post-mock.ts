import { type ListingPost } from '@echo/firestore/types/model/listing-post/listing-post'
import { LISTING_MOCK_ID } from '@echo/model-mocks/listing/listing-mock'

export const listingPostMock: Record<string, ListingPost> = {
  jXadAgs0rtUXZWfG9t0z: {
    listingId: LISTING_MOCK_ID,
    guild: {
      id: '1',
      channelId: '1'
    },
    postedAt: 1676984897
  }
}
