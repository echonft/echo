import { FirestoreSwapActivity } from '../../collections/swap/firestore-swap-activity'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreSwapActivityData extends FirestoreSwapActivity, FirestoreDocumentData {}
