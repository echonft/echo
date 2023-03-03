import { FirestoreSwapActivity } from '../../collections'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreSwapActivityData extends FirestoreSwapActivity, FirestoreDocumentData {}
