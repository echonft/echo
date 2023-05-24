import { FirestoreActivityData } from '@echo/firestore'
import { DiscordGuild, Nft, OfferState, User } from '@echo/model'

// TODO Should all be FirestoreData
export interface OfferResponse {
  id: string
  state: OfferState
  discordGuild: DiscordGuild
  threadId: string | undefined
  sender: User
  senderItems: Nft[]
  receiver: User
  receiverItems: Nft[]
  activities?: FirestoreActivityData[]
  expiresAt: number
  postedAt: number | undefined
  createdAt: number
}
