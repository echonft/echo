import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirebaseOfferItem {
  contractAddress: string
  id?: string
}

export interface FirebaseOffer extends DocumentData {
  status: string
  type: string
  collection: DocumentReference
  seller: DocumentReference
  buyer: DocumentReference
  // TODO Add proper data
  selling: Array<FirebaseOfferItem>
  buying?: Array<FirebaseOfferItem>
  postedAt: number
}
