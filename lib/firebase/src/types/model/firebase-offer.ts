import { DocumentReference } from 'firebase/firestore'

export interface FirebaseOffer {
  status: string
  type: string
  collection: DocumentReference
  seller: DocumentReference
  buyer: DocumentReference
  // TODO Add proper data
  selling: string
  buying: string
  postedAt: number
}
