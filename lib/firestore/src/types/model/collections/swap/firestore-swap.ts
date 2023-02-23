import { FirestoreOffer } from '../offer/firestore-offer'
import { FirestoreSwapActivity } from './firestore-swap-activity'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreSwap extends DocumentData {
  state: string
  offer: DocumentReference<FirestoreOffer>
  activities: FirestoreSwapActivity[]
  expiresAt: number
  createdAt: number
}
