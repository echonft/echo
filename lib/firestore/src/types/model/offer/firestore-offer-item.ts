import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'

export interface FirestoreOfferItem {
  amount: number
  nft: FirestoreNft
}
