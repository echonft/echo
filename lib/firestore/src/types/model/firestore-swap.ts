import { FirestoreOffer } from './firestore-offer'
import { FirestoreOfferItem } from './firestore-offer-item'
import { FirestoreSwapActivity } from './firestore-swap-activity'
import { FirestoreUser } from './firestore-user'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreSwap extends DocumentData {
  state: string
  sender: DocumentReference<FirestoreUser>
  senderItems: Array<FirestoreOfferItem>
  receiver: DocumentReference<FirestoreUser>
  receiverItems: Array<FirestoreOfferItem>
  offer: DocumentReference<FirestoreOffer>
  activities: Array<FirestoreSwapActivity>
  expiresAt: number
  createdAt: number
}
