import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { pipe } from 'ramda'

export function deleteWallet(id: string): Promise<string> {
  return pipe(getWalletsCollectionReference, deleteReference(id))()
}
