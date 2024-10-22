import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import type { Nft } from '@echo/model/types/nft/nft'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Slug } from '@echo/model/types/slug'
import type { Query } from 'firebase-admin/firestore'
import { always, isNil, pipe, unless } from 'ramda'

export interface GetNftsForCollectionOptions {
  excludeOwner?: string
}

export function getNftsForCollectionQuery(
  collectionSlug: Slug,
  options?: GetNftsForCollectionOptions
): Query<Nft, NftDocumentData> {
  return pipe(
    getNftsCollectionReference,
    queryWhere('collection.slug', '==', collectionSlug),
    unless(always(isNil(options?.excludeOwner)), queryWhere('owner.username', '!=', options?.excludeOwner)),
    queryOrderBy<Nft, NftDocumentData>('owner.discord.username'),
    queryOrderBy<Nft, NftDocumentData>('tokenId')
  )()
}

export function getNftsForCollection(collectionSlug: Slug, options?: GetNftsForCollectionOptions): Promise<OwnedNft[]> {
  return pipe(getNftsForCollectionQuery, getQueryData)(collectionSlug, options) as Promise<OwnedNft[]>
}
