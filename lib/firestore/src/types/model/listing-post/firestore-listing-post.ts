import type { ListingDiscordGuildData } from '@echo/firestore/types/model/listing-post/listing-post-document-data'
import type { Dayjs } from 'dayjs'

export interface FirestoreListingPost {
  id: string
  listingId: string
  guild: ListingDiscordGuildData
  postedAt: Dayjs
}
