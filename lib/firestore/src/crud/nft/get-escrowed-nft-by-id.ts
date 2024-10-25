import { escrowedNftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getReferenceById } from '@echo/firestore/helpers/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/reference/get-reference-data'
import type { EscrowedNftDocument } from '@echo/firestore/types/model/escrowed-nft-document'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function getEscrowedNftById(id: string): Promise<Nullable<EscrowedNftDocument>> {
  return pipe(getReferenceById, getReferenceData)({ collectionReference: escrowedNftsCollection(), id })
}
