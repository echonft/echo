import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { pipe } from 'ramda'

export function deleteSwap(id: string): Promise<string> {
  return pipe(getSwapsCollectionReference, deleteReference(id))()
}
