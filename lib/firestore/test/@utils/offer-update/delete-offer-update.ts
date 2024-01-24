import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function deleteOfferUpdate(id: string): Promise<WriteResult> {
  return pipe(getOfferUpdatesCollectionReference, deleteReference(id))()
}
