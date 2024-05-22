import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft } from '@echo/model/types/nft'
import { always, isNil, pipe, unless } from 'ramda'

export interface GetNftsForCollectionOptions {
  excludeOwner?: string
}

export function getNftsForCollection(collectionSlug: string, options?: GetNftsForCollectionOptions): Promise<Nft[]> {
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('collection.slug', '==', collectionSlug),
    unless(always(isNil(options?.excludeOwner)), queryWhere<Nft>('owner.username', '!=', options?.excludeOwner)),
    queryOrderBy<Nft>('owner.discord.username'),
    queryOrderBy<Nft>('tokenId'),
    getQueryData
  )()
}
