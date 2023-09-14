import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'

export interface FirestoreOfferItem {
  amount: number
  nft: Partial<FirestoreNft>
}
