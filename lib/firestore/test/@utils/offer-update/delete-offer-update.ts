import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteOfferUpdate(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getOfferUpdatesCollectionReference(),
    id
  })
}
