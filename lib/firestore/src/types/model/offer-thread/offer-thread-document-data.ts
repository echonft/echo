export interface OfferThreadDocumentData {
  offerId: string
  guild: {
    channelId: string
    id: string
    threadId: string
  }
  postedAt: number
  state: 'ACTIVE' | 'ARCHIVED'
}
