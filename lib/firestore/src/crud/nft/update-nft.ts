import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Nft } from '@echo/model/types/nft'
import { now } from '@echo/utils/helpers/now'
import { assoc, pipe } from 'ramda'

export function updateNft(id: string, data: Partial<Omit<Nft, 'id' | 'updatedAt'>>): Promise<Nft> {
  return pipe(getNftsCollectionReference, updateReference<Nft>(id, assoc('updatedAt', now(), data)))()
}
