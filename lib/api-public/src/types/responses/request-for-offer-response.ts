import { FirestoreRequestForOfferData } from '@echo/firestore'

export interface RequestForOfferResponse extends Omit<FirestoreRequestForOfferData, 'refPath'> {}
