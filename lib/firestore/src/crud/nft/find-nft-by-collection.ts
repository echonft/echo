import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function findNftByCollection(collectionId: string, tokenId: number): Promise<Nullable<Nft>> {
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('tokenId', '==', tokenId),
    queryWhere<Nft>('collection.id', '==', collectionId),
    getQueryUniqueData
  )()
}
