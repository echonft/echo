import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { Slug } from '@echo/model/types/slug'
import type { Query } from 'firebase-admin/firestore'
import { always, isNil, pipe, unless } from 'ramda'

export interface GetNftsForCollectionOptions {
  excludeOwner?: string
}

export function getNftsForCollectionQuery(
  collectionSlug: Slug,
  options?: GetNftsForCollectionOptions
): Query<NftDocument> {
  return pipe(
    nftsCollection,
    queryWhere('collection.slug', '==', collectionSlug),
    unless(always(isNil(options?.excludeOwner)), queryWhere('owner.username', '!=', options?.excludeOwner)),
    queryOrderBy<NftDocument>('owner.discord.username'),
    queryOrderBy<NftDocument>('tokenId')
  )()
}

export function getNftsForCollection(
  collectionSlug: Slug,
  options?: GetNftsForCollectionOptions
): Promise<NftDocument[]> {
  return pipe(getNftsForCollectionQuery, getQueryData)(collectionSlug, options)
}
