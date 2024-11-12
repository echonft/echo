import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe, toLower } from 'ramda'

export function getNftSnapshotByCollectionContract(
  nft: Pick<Nft, 'tokenId'> & Record<'collection', Pick<Collection, 'contract'>>
): Promise<Nullable<QueryDocumentSnapshot<NftDocument>>> {
  return pipe(
    nftsCollection,
    queryWhere('tokenId', '==', nft.tokenId),
    queryWhere('collection.contract', '==', toLower(nft.collection.contract)),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getNftByCollectionContract(
  nft: Pick<Nft, 'tokenId'> & Record<'collection', Pick<Collection, 'contract'>>
): Promise<Nullable<NftDocument>> {
  return pipe(getNftSnapshotByCollectionContract, andThen(getDocumentSnapshotData))(nft)
}
