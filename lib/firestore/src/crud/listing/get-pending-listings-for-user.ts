import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueriesDocuments } from '@echo/firestore/helpers/query/get-queries-documents'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { nftsCollectionSlug } from '@echo/model/helpers/nft/nfts-collection-slug'
import type { Nft } from '@echo/model/types/nft'
import type { Username } from '@echo/model/types/username'
import type { CollectionReference, Query } from 'firebase-admin/firestore'
import { eqProps, isEmpty, juxt, map, partial, partialRight, pipe, splitEvery } from 'ramda'

export async function getPendingListingsForUser(username: Username): Promise<ListingDocument[]> {
  const nfts = await getNftsForOwner(username)
  if (isEmpty(nfts)) {
    return []
  }
  // we need to split every 30 because 'in' constraints accepts a maximum of 30 values
  const collectionSlugs = pipe<[Nft[]], string[], string[][]>(nftsCollectionSlug, splitEvery(30))(nfts)
  return pipe<
    [],
    CollectionReference<ListingDocument>,
    Query<ListingDocument>,
    Query<ListingDocument>,
    Query<ListingDocument>,
    Query<ListingDocument>,
    Query<ListingDocument>[],
    Promise<ListingDocument[]>
  >(
    listingsCollection,
    queryWhere('creator.username', '!=', username),
    queryWhere('locked', '==', false),
    queryOrderBy('creator.username'),
    queryOrderBy('expiresAt', 'desc'),
    juxt(map(partial(queryWhere<ListingDocument>, ['target.collection.slug', 'in']), collectionSlugs)),
    partialRight(getQueriesDocuments<ListingDocument>, [eqProps('slug')])
  )()
}
