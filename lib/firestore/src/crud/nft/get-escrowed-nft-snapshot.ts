import { escrowedNftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { EscrowedNftDocument } from '@echo/firestore/types/model/escrowed-nft-document'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getEscrowedNftSnapshot(nftId: string): Promise<Nullable<QueryDocumentSnapshot<EscrowedNftDocument>>> {
  return pipe(escrowedNftsCollection, queryWhere('nftId', '==', nftId), getQueryUniqueDocumentSnapshot)()
}
