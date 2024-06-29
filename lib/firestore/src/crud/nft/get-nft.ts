import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getNftSnapshot(
  nft: DeepPartial<Nft> & Required<NftIndex>
): Promise<Nullable<QueryDocumentSnapshot<Nft>>> {
  return pipe(getNftIndex, getNftSnapshotForIndex)(nft)
}

export function getNftSnapshotForIndex(index: NftIndex): Promise<Nullable<QueryDocumentSnapshot<Nft>>> {
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('tokenId', '==', index.tokenId),
    queryWhere<Nft>('collection.slug', '==', index.collection.slug),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getNft(index: NftIndex): Promise<Nullable<Nft>> {
  return pipe(getNftSnapshotForIndex, andThen(getDocumentSnapshotData<Nft>))(index)
}
