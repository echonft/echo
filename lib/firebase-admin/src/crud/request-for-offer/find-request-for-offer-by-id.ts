import { getFirestoreRequestForOfferData } from '../../data/request-for-offer/get-firestore-request-for-offer-data'
import { mapRequestForOffer } from '@echo/firestore'
import { RequestForOffer } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

export const findRequestForOfferById = (id: string) =>
  pipe(getFirestoreRequestForOfferData, mapRequestForOffer, R.fromPromise<RequestForOffer>)(id)
