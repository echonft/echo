import type { ListingPost } from '@echo/firestore/types/model/listing-post/listing-post'
import dayjs from 'dayjs'

export const listingPostMock: Record<string, ListingPost> = {
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
