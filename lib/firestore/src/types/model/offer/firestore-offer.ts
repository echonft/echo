import type { FirestoreOfferDiscordGuild } from '@echo/firestore/types/model/offer/firestore-offer-discord-guild'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import type { Dayjs } from 'dayjs'

export interface FirestoreOffer {
  id: string
  createdAt: Dayjs
  discordGuild?: FirestoreOfferDiscordGuild
  expired: boolean
  expiresAt: Dayjs
  listingsIds: string[]
  receiver: Partial<FirestoreUserDetails>
  receiverItems: NonEmptyArray<FirestoreOfferItem>
  sender: Partial<FirestoreUserDetails>
  senderItems: NonEmptyArray<FirestoreOfferItem>
  state: FirestoreOfferState
}
