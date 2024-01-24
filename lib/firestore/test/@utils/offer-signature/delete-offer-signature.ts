import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function deleteOfferSignature(id: string): Promise<WriteResult> {
  return pipe(getOfferSignaturesCollectionReference, deleteReference(id))()
}
