import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { pipe } from 'ramda'

export function deleteOfferSignature(id: string): Promise<string> {
  return pipe(getOfferSignaturesCollectionReference, deleteReference(id))()
}
