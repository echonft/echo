import type { FirestoreListingPost } from '@echo/firestore/types/model/listing-post/firestore-listing-post'
import dayjs from 'dayjs'

export const listingPostMock: Record<string, FirestoreListingPost> = {
  jXadAgs0rtUXZWfG9t0z: {
    id: 'jXadAgs0rtUXZWfG9t0z',
    listingId: 'jUzMtPGKM62mMhEcmbN4',
    guild: {
      discordId: '1',
      channelId: '1'
    },
    postedAt: dayjs.unix(1676984897)
  }
}
