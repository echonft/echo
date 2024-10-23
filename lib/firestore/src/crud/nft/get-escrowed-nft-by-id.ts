import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { EscrowedNftDocumentData } from '@echo/firestore/types/model/escrowed-nft-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function getEscrowedNftById(id: string): Promise<Nullable<EscrowedNftDocumentData>> {
  return pipe(getReferenceById, getReferenceData)({ collectionReference: getEscrowedNftsCollectionReference(), id })
}
