import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import type { Nft } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getNftsForOwnerQuery(username: string): Query<Nft, NftDocumentData> {
  return pipe(getNftsCollectionReference, queryWhere('owner.username', '==', username), queryOrderBy('tokenId'))()
}

export function getNftsForOwner(username: string): Promise<OwnedNft[]> {
  return pipe(getNftsForOwnerQuery, getQueryData)(username) as Promise<OwnedNft[]>
}
