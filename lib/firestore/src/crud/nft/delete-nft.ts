import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { pipe } from 'ramda'

export function deleteNft(id: string): Promise<string> {
  return pipe(getNftsCollectionReference, deleteReference(id))()
}
