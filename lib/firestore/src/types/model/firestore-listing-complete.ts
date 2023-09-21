import { FirestoreListingItem } from '@echo/firestore/types/model/listing/firestore-listing-item'
import { FirestoreListingState } from '@echo/firestore/types/model/listing/firestore-listing-state'
import { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
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
