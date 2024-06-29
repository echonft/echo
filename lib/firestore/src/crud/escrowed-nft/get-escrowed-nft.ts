import { getEscrowedNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-escrowed-nfts-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getEscrowedNftSnapshot(index: NftIndex): Promise<Nullable<QueryDocumentSnapshot<Nft>>> {
  return pipe(
    getEscrowedNftsCollectionReference,
    queryWhere<Nft>('tokenId', '==', index.tokenId),
    queryWhere<Nft>('collection.slug', '==', index.collection.slug),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getEscrowedNft(index: NftIndex): Promise<Nullable<Nft>> {
  return pipe(getEscrowedNftSnapshot, andThen(getDocumentSnapshotData<Nft>))(index)
}
