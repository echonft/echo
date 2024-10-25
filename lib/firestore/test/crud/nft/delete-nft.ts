import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'

export function deleteNft(id: string): Promise<string> {
  return deleteReference({
    collectionReference: nftsCollection(),
    id
  })
}
