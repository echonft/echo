import { getFirestoreRequestForOfferData } from '../../data/request-for-offer/get-firestore-request-for-offer-data'

export const findRequestForOfferById = (id: string) => getFirestoreRequestForOfferData(id)
