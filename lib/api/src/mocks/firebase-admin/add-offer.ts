import { FirestoreOfferData, FirestoreOfferPrototype, offerFirestoreData } from '@echo/firestore'

export const mockAddOffer = (_offerPrototype: FirestoreOfferPrototype): Promise<FirestoreOfferData> => {
  return Promise.resolve(offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!)
}
