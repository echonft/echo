import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import type { FirestoreOfferDiscordGuild } from '@echo/firestore/types/model/offer/firestore-offer-discord-guild'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import type { Dayjs } from 'dayjs'

export interface FirestoreOfferComplete {
  id: string
  createdAt: Dayjs
  discordGuild?: FirestoreOfferDiscordGuild
  expired: boolean
  expiresAt: Dayjs
  listingsIds: string[]
  receiver: FirestoreUserDetails
  receiverItems: NonEmptyArray<FirestoreOfferItem & { nft: FirestoreNft }>
  sender: FirestoreUserDetails
  senderItems: NonEmptyArray<FirestoreOfferItem & { nft: FirestoreNft }>
  state: FirestoreOfferState
  swapTransactionId?: string
}
