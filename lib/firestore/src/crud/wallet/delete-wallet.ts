import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteWallet(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getWalletsCollectionReference(),
    id
  })
}
