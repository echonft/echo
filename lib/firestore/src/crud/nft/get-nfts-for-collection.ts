import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { NftDocument, OwnedNftDocument } from '@echo/firestore/types/model/nft-document'
import type { Slug } from '@echo/model/types/slug'
import type { Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getNftsForCollectionQuery(slug: Slug): Query<NftDocument> {
  return pipe(
    nftsCollection,
    queryWhere('collection.slug', '==', slug),
    queryOrderBy('owner.username'),
    queryOrderBy('tokenId')
  )()
}

export function getNftsForCollection(slug: Slug): Promise<OwnedNftDocument[]> {
  return pipe(getNftsForCollectionQuery, getQueryData)(slug) as Promise<OwnedNftDocument[]>
}
