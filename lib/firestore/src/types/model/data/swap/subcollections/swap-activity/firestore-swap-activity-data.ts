import { FirestoreSwapActivity } from '../../../../collections'
import { FirestoreData } from '../../../abstract/firestore-data'

export interface FirestoreSwapActivityData extends FirestoreSwapActivity, FirestoreData {
  id: string
}
