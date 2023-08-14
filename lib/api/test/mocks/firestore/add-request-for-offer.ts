import { requestForOfferFirestoreData } from '../request-for-offer-firestore-data'
import { FirestoreRequestForOfferData, FirestoreRequestForOfferPrototype } from '@echo/firestore'

export const mockAddRequestForOffer = (
  _offerPrototype: FirestoreRequestForOfferPrototype
): Promise<FirestoreRequestForOfferData> => {
  return Promise.resolve(requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!)
}
