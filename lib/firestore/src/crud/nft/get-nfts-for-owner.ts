import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { NftDocument, OwnedNftDocument } from '@echo/firestore/types/model/nft-document'
import type { Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getNftsForOwnerQuery(username: string): Query<NftDocument> {
  return pipe(nftsCollection, queryWhere('owner.username', '==', username), queryOrderBy('tokenId'))()
}

export function getNftsForOwner(username: string): Promise<OwnedNftDocument[]> {
  return pipe(getNftsForOwnerQuery, getQueryData)(username) as Promise<OwnedNftDocument[]>
}
