import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { getReferenceById } from '@echo/firestore/helpers/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/reference/get-reference-data'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getOfferReferenceById(id: string): DocumentReference<OfferDocument> {
  return getReferenceById({ collectionReference: offersCollection(), id })
}

export function getOfferById(id: string): Promise<Nullable<OfferDocument>> {
  return pipe(getOfferReferenceById, getReferenceData)(id)
}
