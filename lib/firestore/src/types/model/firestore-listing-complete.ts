import { FirestoreListingItem } from '@echo/firestore/types/model/firestore-listing-item'
import { FirestoreListingState } from '@echo/firestore/types/model/firestore-listing-state'
import { FirestoreListingTarget } from '@echo/firestore/types/model/firestore-listing-target'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/firestore-user-details'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import type { Dayjs } from 'dayjs'

export interface FirestoreListingComplete {
  id: string
  createdAt: Dayjs
  creator: FirestoreUserDetails
  expired: boolean
  expiresAt: Dayjs
  items: NonEmptyArray<FirestoreListingItem & { nft: FirestoreNft }>
  offersIds: string[]
  state: FirestoreListingState
  targets: NonEmptyArray<FirestoreListingTarget & { collection: FirestoreNftCollection }>
}
