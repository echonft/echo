import { FirestoreOffer } from '../offer/firestore-offer'
import { FirestoreSwapActivity } from './subcollections/swap-activity/firestore-swap-activity'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreSwap extends DocumentData {
  state: string
  offer: DocumentReference<FirestoreOffer>
  activities: Array<FirestoreSwapActivity>
  expiresAt: number
  createdAt: number
}
