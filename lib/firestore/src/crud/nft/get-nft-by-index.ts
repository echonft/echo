import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getNftSnapshotByIndex(index: NftIndex): Promise<Nullable<QueryDocumentSnapshot<Nft, NftDocumentData>>> {
  return pipe(
    getNftsCollectionReference,
    queryWhere('tokenId', '==', index.tokenId),
    queryWhere('collection.slug', '==', index.collection.slug),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getNftByIndex(index: NftIndex): Promise<Nullable<Nft>> {
  return pipe(getNftSnapshotByIndex, andThen(getDocumentSnapshotData))(index)
}
