import {
  FirestoreRequestForOfferData,
  FirestoreRequestForOfferPrototype,
  requestForOfferFirestoreData
} from '@echo/firestore'

export const mockAddRequestForOffer = (
  _offerPrototype: FirestoreRequestForOfferPrototype
): Promise<FirestoreRequestForOfferData> => {
  return Promise.resolve(requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!)
}
