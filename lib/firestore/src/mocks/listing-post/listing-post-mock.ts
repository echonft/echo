import { type ListingPost } from '@echo/firestore/types/model/listing-post/listing-post'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'

export function listingPostMock(): Record<string, ListingPost> {
  return {
    jXadAgs0rtUXZWfG9t0z: {
      listingId: listingMockId(),
      guild: {
        id: '1',
        channelId: '1'
      },
      postedAt: 1676984897
    }
  }
}
