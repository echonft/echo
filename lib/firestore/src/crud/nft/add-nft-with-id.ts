import { setReferenceById } from '@echo/firestore/helpers/crud/reference/set-reference-by-id'
import { getNftDocumentReference } from '@echo/firestore/helpers/document-reference/get-nft-document-reference'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Nft } from '@echo/model/types/nft'
import { now } from '@echo/utils/helpers/now'
import { assoc } from 'ramda'

export async function addNftWithId(nft: NftWithId): Promise<NewDocument<Nft>> {
  const data = assoc('updatedAt', now(), nft)
  const id = await setReferenceById<Nft>({
    documentReference: getNftDocumentReference(nft.id),
    data
  })
  return { id, data }
}
