import { walletsCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'

export function deleteWallet(id: string): Promise<string> {
  return deleteReference({
    collectionReference: walletsCollection(),
    id
  })
}
