import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'

export interface FirestoreListingTarget {
  collection: FirestoreNftCollection
  amount: number
}
