import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueriesDocuments } from '@echo/firestore/helpers/crud/query/get-queries-documents'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { nftsCollectionSlug } from '@echo/model/helpers/nft/nfts-collection-slug'
import { type Listing } from '@echo/model/types/listing/listing'
import type { Nft } from '@echo/model/types/nft/nft'
import type { CollectionReference, Query } from 'firebase-admin/firestore'
import { eqProps, isEmpty, juxt, map, partial, partialRight, pipe, splitEvery } from 'ramda'

export async function getPendingListingsForUser(username: string): Promise<Listing[]> {
  const nfts = await getNftsForOwner(username)
  if (isEmpty(nfts)) {
    return []
  }
  // we need to split every 30 because 'in' constraints accepts a maximum of 30 values
  const collectionSlugs = pipe<[Nft[]], string[], string[][]>(nftsCollectionSlug, splitEvery(30))(nfts)
  return pipe<
    [],
    CollectionReference<Listing, ListingDocumentData>,
    Query<Listing, ListingDocumentData>,
    Query<Listing, ListingDocumentData>,
    Query<Listing, ListingDocumentData>,
    Query<Listing, ListingDocumentData>,
    Query<Listing, ListingDocumentData>[],
    Promise<Listing[]>
  >(
    getListingsCollectionReference,
    queryWhere('creator.username', '!=', username),
    queryWhere('locked', '==', false),
    queryOrderBy('creator.username'),
    queryOrderBy('expiresAt', 'desc'),
    juxt(map(partial(queryWhere<Listing, ListingDocumentData>, ['target.collection.slug', 'in']), collectionSlugs)),
    partialRight(getQueriesDocuments<Listing, ListingDocumentData>, [eqProps('slug')])
  )()
}
