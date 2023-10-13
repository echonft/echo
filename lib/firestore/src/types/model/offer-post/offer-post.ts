export interface OfferPost {
  id: string
  offerId: string
  guild: {
    discordId: string
    threadId: string
  }
  postedAt: number
}
