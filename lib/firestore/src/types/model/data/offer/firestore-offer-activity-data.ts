import { FirestoreOfferActivity } from '../../collections'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreOfferActivityData extends FirestoreOfferActivity, FirestoreDocumentData {}
