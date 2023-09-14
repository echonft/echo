import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'

export interface FirestoreListingTarget {
  collection: Partial<FirestoreNftCollection>
  amount: number
}
