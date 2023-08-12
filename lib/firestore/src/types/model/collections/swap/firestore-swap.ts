import { FirestoreActivity } from '../activity/firestore-activity'
import { FirestoreOffer } from '../offer/firestore-offer'
import { DocumentData, DocumentReference } from '@google-cloud/firestore'

export interface FirestoreSwap extends DocumentData {
  state: string
  offer: DocumentReference<FirestoreOffer>
  activities: FirestoreActivity[]
  expiresAt: number
  createdAt: number
}
