import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'

export interface FirestoreListingItem {
  amount: number
  nft: FirestoreNft
}
