import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { EscrowedNftDocumentData } from '@echo/firestore/types/model/nft/escrowed-nft-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getEscrowedNftSnapshot(
  nftId: string
): Promise<Nullable<QueryDocumentSnapshot<EscrowedNftDocumentData, EscrowedNftDocumentData>>> {
  return pipe(getEscrowedNftsCollectionReference, queryWhere('nftId', '==', nftId), getQueryUniqueDocumentSnapshot)()
}
