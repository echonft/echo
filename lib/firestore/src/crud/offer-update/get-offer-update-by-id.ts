import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { OfferUpdateDocumentData } from '@echo/firestore/types/model/offer-update/offer-update-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getOfferUpdateReferenceById(
  id: string
): Promise<DocumentReference<OfferUpdateDocumentData, OfferUpdateDocumentData>> {
  return getReferenceById({ collectionReference: getOfferUpdatesCollectionReference(), id })
}

export function getOfferUpdateById(id: string): Promise<Nullable<OfferUpdateDocumentData>> {
  return pipe(getOfferUpdateReferenceById, andThen(getReferenceData))(id)
}
