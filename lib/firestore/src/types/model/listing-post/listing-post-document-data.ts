export interface ListingPostDocumentData {
  listingId: string
  guild: {
    channelId: string
    id: string
  }
  postedAt: number
}
