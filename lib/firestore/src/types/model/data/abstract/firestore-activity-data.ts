import { FirestoreRequestForOfferActivity } from '../../collections/request-for-offer/firestore-request-for-offer-activity'
import { FirestoreOfferActivityData } from '../offer/firestore-offer-activity-data'
import { FirestoreSwapActivityData } from '../swap/firestore-swap-activity-data'

export type FirestoreActivityData =
  | FirestoreRequestForOfferActivity
  | FirestoreSwapActivityData
  | FirestoreOfferActivityData
