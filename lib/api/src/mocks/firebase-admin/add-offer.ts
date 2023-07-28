import { FirestoreOfferData, FirestoreOfferPrototype, offerFirestoreData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'

export const mockAddOffer = (
  _offerPrototype: FirestoreOfferPrototype
): Promise<R.Result<FirestoreOfferData, Error>> => {
  return Promise.resolve(R.fromNullable(offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi'], new Error('invalid data')))
}
