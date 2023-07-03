import { getFirestoreRequestForOfferData } from '../../data/request-for-offer/get-firestore-request-for-offer-data'
import { FirestoreRequestForOfferData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

export const findRequestForOfferById = (id: string) =>
  pipe(getFirestoreRequestForOfferData, R.fromPromise<FirestoreRequestForOfferData>)(id)
