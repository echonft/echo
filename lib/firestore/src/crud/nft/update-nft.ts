import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Nft } from '@echo/model/types/nft'
import { now } from '@echo/utils/helpers/now'
import { WriteResult } from 'firebase-admin/firestore'
import { assoc, pipe } from 'ramda'

export function updateNft(id: string, data: Partial<Omit<Nft, 'id' | 'updatedAt'>>): Promise<WriteResult> {
  return pipe(getNftsCollectionReference, updateReference(id, assoc('updatedAt', now(), data)))()
}
