import { getFirestoreOfferData } from '../../data/offer/get-firestore-offer-data'

// TODO Should add a check if ID does not exist
export const findOfferById = (id: string) => getFirestoreOfferData(id)
