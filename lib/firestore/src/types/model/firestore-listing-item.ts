import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'

export interface FirestoreListingItem {
  amount: number
  nft: Partial<FirestoreNft>
}
