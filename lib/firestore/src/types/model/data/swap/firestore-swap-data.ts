import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreOfferData } from '../offer/firestore-offer-data'
import { FirestoreSwapActivityData } from './firestore-swap-activity-data'

export interface FirestoreSwapData extends FirestoreRootCollectionDocumentData {
  state: string
  expiresAt: number
  createdAt: number
  offer: FirestoreOfferData
  activities: FirestoreSwapActivityData[]
}
