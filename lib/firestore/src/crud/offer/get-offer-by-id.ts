import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { Offer } from '@echo/model/types/offer'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getOfferReferenceById(id: string): DocumentReference<Offer> {
  return getReferenceById<Offer>({ collectionReference: getOffersCollectionReference(), id })
}

export function getOfferById(id: string): Promise<Nullable<Offer>> {
  return pipe(getOfferReferenceById, getReferenceData<Offer>)(id)
}
