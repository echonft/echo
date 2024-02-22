import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft } from '@echo/model/types/nft'
import { always, isNil, pipe, unless } from 'ramda'

interface GetNftsForCollectionOptions {
  excludeDiscordUsername?: string
}
export function getNftsForCollection(slug: string, options?: GetNftsForCollectionOptions): Promise<Nft[]> {
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('collection.slug', '==', slug),
    unless(
      always(isNil(options?.excludeDiscordUsername)),
      queryWhere<Nft>('owner.discord.username', '!=', options?.excludeDiscordUsername)
    ),
    queryOrderBy<Nft>('owner.discord.username'),
    queryOrderBy<Nft>('tokenId'),
    getQueryData
  )()
}
