import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreActivityData } from '../activity/firestore-activity-data'
import { FirestoreOfferData } from '../offer/firestore-offer-data'
import { FirestoreSwapState } from './firestore-swap-state'

export interface FirestoreSwapData extends FirestoreRootCollectionDocumentData {
  activities: FirestoreActivityData[]
  offer: FirestoreOfferData
  state: FirestoreSwapState
  createdAt: number
  expiresAt: number
}
