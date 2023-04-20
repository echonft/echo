import { Contract, DiscordGuild, Offer, OfferItem, OfferState, Swap, User } from '@echo/model'

// TODO Should this become a simple listing response?
export interface CreateListingResponse {
  createdAt: number
  discordGuild: DiscordGuild
  expiresAt: number
  items: OfferItem[]
  offers?: Offer[]
  sender: User
  state: OfferState
  swaps?: Swap[]
  target?: Contract[]
}
