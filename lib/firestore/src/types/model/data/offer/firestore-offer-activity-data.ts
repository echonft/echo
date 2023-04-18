import { FirestoreOfferActivity } from '../../collections/offer/firestore-offer-activity'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreOfferActivityData extends FirestoreOfferActivity, FirestoreDocumentData {}
