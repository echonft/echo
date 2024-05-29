import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteEscrowedNft(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getEscrowedNftsCollectionReference(),
    id
  })
}
