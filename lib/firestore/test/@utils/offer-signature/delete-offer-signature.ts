import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteOfferSignature(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getOfferSignaturesCollectionReference(),
    id
  })
}
