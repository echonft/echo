import { FirestoreSwap } from '../../collections/swap/firestore-swap'
import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreOfferData } from '../offer/firestore-offer-data'
import { FirestoreSwapActivityData } from './firestore-swap-activity-data'

export interface FirestoreSwapData
  extends FirestoreRootCollectionDocumentData,
    Omit<FirestoreSwap, 'offer' | 'activities'> {
  id: string
  offer: FirestoreOfferData
  activities: FirestoreSwapActivityData[]
}
