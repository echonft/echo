import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { EscrowedNft } from '@echo/firestore/types/model/nft/escrowed-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getEscrowedNftSnapshot(nftId: string): Promise<Nullable<QueryDocumentSnapshot<EscrowedNft>>> {
  return pipe(
    getEscrowedNftsCollectionReference,
    queryWhere<EscrowedNft>('nftId', '==', nftId),
    getQueryUniqueDocumentSnapshot
  )()
}
