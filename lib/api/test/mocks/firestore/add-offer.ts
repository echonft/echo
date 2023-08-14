import { offerFirestoreData } from '../offer-firestore-data'
import { FirestoreOfferData, FirestoreOfferPrototype } from '@echo/firestore'

export const mockAddOffer = (_offerPrototype: FirestoreOfferPrototype): Promise<FirestoreOfferData> => {
  return Promise.resolve(offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!)
}
