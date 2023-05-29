import {
  FirestoreRequestForOfferData,
  FirestoreRequestForOfferPrototype,
  requestForOfferFirestoreData
} from '@echo/firestore'
import { R } from '@mobily/ts-belt'

export const mockAddRequestForOffer = (
  _offerPrototype: FirestoreRequestForOfferPrototype
): Promise<R.Result<FirestoreRequestForOfferData, Error>> => {
  return Promise.resolve(
    R.fromNullable(requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4'], new Error('invalid data'))
  )
}
