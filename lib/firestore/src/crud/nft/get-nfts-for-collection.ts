import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OwnedNft } from '@echo/model/types/nft'
import { always, isNil, pipe, unless } from 'ramda'

export interface GetNftsForCollectionOptions {
  excludeOwner?: string
}

export function getNftsForCollection(
  collectionSlug: string,
  options?: GetNftsForCollectionOptions
): Promise<OwnedNft[]> {
  return pipe(
    getNftsCollectionReference<true>,
    queryWhere('collection.slug', '==', collectionSlug),
    unless(always(isNil(options?.excludeOwner)), queryWhere('owner.username', '!=', options?.excludeOwner)),
    queryOrderBy('owner.discord.username'),
    queryOrderBy('tokenId'),
    getQueryData
  )(true) as Promise<OwnedNft[]>
}
