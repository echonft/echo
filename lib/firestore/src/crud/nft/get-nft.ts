import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getNftSnapshot(index: NftIndex): Promise<Nullable<QueryDocumentSnapshot<Nft>>> {
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('tokenId', '==', index.tokenId),
    queryWhere<Nft>('collection.slug', '==', index.collection.slug),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getNft(index: NftIndex): Promise<Nullable<Nft>> {
  return pipe(getNftSnapshot, andThen(getDocumentSnapshotData<Nft>))(index)
}
