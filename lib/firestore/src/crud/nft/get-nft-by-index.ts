import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function getNftByIndex(index: NftIndex): Promise<Nullable<Nft>> {
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('collection.slug', '==', index.collection.slug),
    queryWhere<Nft>('tokenId', '==', index.tokenId),
    queryOrderBy<Nft>('collection.slug'),
    queryOrderBy<Nft>('tokenId'),
    getQueryUniqueData
  )()
}
