import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getNftSnapshotByIndex(index: NftIndex): Promise<Nullable<QueryDocumentSnapshot<Nft>>> {
  return pipe(
    getNftsCollectionReference<true>,
    queryWhere<Nft>('tokenId', '==', index.tokenId),
    queryWhere<Nft>('collection.slug', '==', index.collection.slug),
    getQueryUniqueDocumentSnapshot
  )(true)
}

export function getNftByIndex(index: NftIndex): Promise<Nullable<Nft>> {
  return pipe(getNftSnapshotByIndex, andThen(getDocumentSnapshotData<Nft>))(index)
}
