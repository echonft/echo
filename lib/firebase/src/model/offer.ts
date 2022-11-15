import { DocumentReference } from 'firebase/firestore'

export interface FirebaseOffer {
  status: string
  collection: DocumentReference
  seller: DocumentReference
  buyer: DocumentReference
  // TODO Add proper data
  selling: string
  buying: string
  postedAt: number
}
