import { FirestoreSwap } from '../../collections'
import { FirestoreOfferData } from '../offer/firestore-offer-data'
import { FirestoreSwapActivityData } from './subcollections/swap-activity/firestore-swap-activity-data'

export interface FirestoreSwapData extends Omit<FirestoreSwap, 'offer' | 'activities'> {
  offer: FirestoreOfferData
  activities: Array<FirestoreSwapActivityData>
}
