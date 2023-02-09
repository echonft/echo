import { DocumentData } from 'firebase/firestore'

export interface FirestoreOfferItem extends DocumentData {
  contracts: string
  tokenId: string
}
