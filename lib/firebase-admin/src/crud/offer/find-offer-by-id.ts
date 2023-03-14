import { getFirestoreOfferData } from '../../data/offer/get-firestore-offer-data'
import { mapOffer } from '@echo/firestore'
import { Offer } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

export const findOfferById = (id: string) => pipe(getFirestoreOfferData, mapOffer, R.fromPromise<Offer>)(id)
