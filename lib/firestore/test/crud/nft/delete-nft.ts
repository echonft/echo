import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteNft(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getNftsCollectionReference(),
    id
  })
}
