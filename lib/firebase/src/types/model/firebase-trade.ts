import { DocumentData, DocumentReference } from 'firebase/firestore'
import { FirebaseOfferItem } from './firebase-offer'

export interface FirebaseTrade extends DocumentData {
  status: string
  offer: DocumentReference
  owner: DocumentReference
  counterparty: DocumentReference
  // TODO Add proper data
  ownerItems: FirebaseOfferItem[]
  counterpartyItems: FirebaseOfferItem[]
  threadId: string
}
