import { getFirestoreOfferData } from '../../data/offer/get-firestore-offer-data'
import { FirestoreOfferData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

// TODO Should add a check if ID does not exist
export const findOfferById = (id: string) => pipe(getFirestoreOfferData, R.fromPromise<FirestoreOfferData>)(id)
