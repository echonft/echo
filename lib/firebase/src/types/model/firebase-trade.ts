import { DocumentReference } from 'firebase/firestore'

export interface FirebaseTrade {
  status: string
  offer: DocumentReference
  owner: DocumentReference
  counterparty: DocumentReference
  // TODO Add proper data
  ownerItems: string
  counterpartyItems: string
  threadId: string
}
