import { FirestoreOfferData } from '@echo/firestore'

export interface OfferResponse extends Omit<FirestoreOfferData, 'refPath'> {}
