import { setReferenceById } from '@echo/firestore/helpers/crud/reference/set-reference-by-id'
import { getEscrowedNftDocumentReference } from '@echo/firestore/helpers/document-reference/get-escrowed-nft-document-reference'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Nft } from '@echo/model/types/nft'
import { now } from '@echo/utils/helpers/now'
import { assoc, dissoc, pipe } from 'ramda'

export async function addEscrowedNftWithId(nft: NftWithId): Promise<NewDocument<Nft>> {
  const id = nft.id
  const data = pipe<[Nft], Nft, Nft>(assoc('updatedAt', now()), dissoc('id'))(nft)
  await setReferenceById<Nft>({
    documentReference: getEscrowedNftDocumentReference(id),
    data
  })
  return { id, data }
}
