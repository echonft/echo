import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { NftIndex } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getNftSnapshotByIndex(index: NftIndex): Promise<Nullable<QueryDocumentSnapshot<NftDocument>>> {
  return pipe(
    nftsCollection,
    queryWhere('tokenId', '==', index.tokenId),
    queryWhere('collection.slug', '==', index.collection.slug),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getNftByIndex(index: NftIndex): Promise<Nullable<NftDocument>> {
  return pipe(getNftSnapshotByIndex, andThen(getDocumentSnapshotData))(index)
}
