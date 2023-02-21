import { FirestoreOfferActivity } from '../../../../collections'
import { FirestoreData } from '../../../abstract/firestore-data'

export interface FirestoreOfferActivityData extends FirestoreOfferActivity, FirestoreData {
  id: string
}
