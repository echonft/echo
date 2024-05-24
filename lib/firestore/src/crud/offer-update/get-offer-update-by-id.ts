import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getOfferUpdateReferenceById(id: string): DocumentReference<OfferUpdate> {
  return getReferenceById<OfferUpdate>({ collectionReference: getOfferUpdatesCollectionReference(), id })
}

export function getOfferUpdateById(id: string): Promise<Nullable<OfferUpdate>> {
  return pipe(getOfferUpdateReferenceById, getReferenceData<OfferUpdate>)(id)
}
