import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Nft } from '@echo/model/types/nft'
import { WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export async function unchecked_updateNft(id: string, data: Partial<Omit<Nft, 'id'>>): Promise<WriteResult> {
  return pipe(getNftsCollectionReference, updateReference(id, data))()
}
