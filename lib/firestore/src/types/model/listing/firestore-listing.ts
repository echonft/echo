import type { FirestoreListingItem } from '@echo/firestore/types/model/listing/firestore-listing-item'
import type { FirestoreListingState } from '@echo/firestore/types/model/listing/firestore-listing-state'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import type { Dayjs } from 'dayjs'

export interface FirestoreListing {
  id: string
  createdAt: Dayjs
  creator: Partial<FirestoreUserDetails>
  expired: boolean
  expiresAt: Dayjs
  items: NonEmptyArray<FirestoreListingItem>
  state: FirestoreListingState
  targets: NonEmptyArray<FirestoreListingTarget>
}
